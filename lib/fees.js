// Single source of fee math for the whole site: the per-platform calculator,
// the compare table, /sheet, and the build-time {{calc:*}} placeholders all
// call computeFees() here. p1-extension/content.js carries its own copy
// (extensions cannot import from the site) — keep the two in sync and run
// p1-extension/test/compute.test.mjs after touching either.
//
// Numbers come only from the platform config (config/rates.yaml). Nothing in
// this file knows a rate.

// Listing fee actually charged on this sale. eBay's official fee page: "Every
// month, you get up to 250 zero insertion fee listings" — so the insertion fee
// only applies once a seller has used that allowance (opts.paidListings).
export function listingFeeCharged(r, opts = {}) {
  if (!r) return 0;
  if (r.listing_fee_free_per_month && !opts.paidListings) return 0;
  return Number(r.listing_fee) || 0;
}

// Does buyer-paid shipping reach the seller's payout on this platform?
// Poshmark and Vinted collect the label fee from the buyer directly, so a
// "shipping charged" figure never enters the seller's money.
export function sellerReceivesShipping(r) {
  if (!r) return true;
  return r.shipping_in_payout !== false && r.fee_base !== 'item_only';
}

// r    platform config
// item item price
// ship buyer-paid shipping the seller charges (ignored where the seller never receives it)
// opts.paidListings  seller has used up the monthly free-insertion allowance (eBay)
// Returns null when the config cannot support a number.
export function computeFees(r, item, ship = 0, opts = {}) {
  if (!r || r.final_value_percent == null) return null;
  const price = Number(item) || 0;
  const itemOnly = r.fee_base === 'item_only';
  const receivesShip = sellerReceivesShipping(r);
  const shipIn = receivesShip ? Number(ship) || 0 : 0;
  const gross = price + shipIn;

  let fv;
  if (itemOnly) {
    const thr = r.commission_threshold_price != null ? Number(r.commission_threshold_price) : null;
    const minC = r.min_commission != null ? Number(r.min_commission) : null;
    const pctFee = (price * Number(r.final_value_percent)) / 100;
    if (thr != null && minC != null) fv = price < thr ? minC : pctFee;
    else {
      fv = pctFee;
      if (minC != null && fv < minC) fv = minC;
    }
  } else {
    fv = (gross * Number(r.final_value_percent)) / 100;
  }

  // Small-order tier (eBay: $0.30 on orders of $10 or less, $0.40 above).
  const smallTier = r.per_order_fixed_under_10;
  const tiered = gross <= 10 && smallTier != null;
  const fixed = tiered ? Number(smallTier) : Number(r.per_order_fixed) || 0;
  const pay = (gross * (Number(r.payment_percent) || 0)) / 100 + (Number(r.payment_fixed) || 0);
  const listing = opts.excludeListing ? 0 : listingFeeCharged(r, opts);
  // Display convention used everywhere on the site: each fee line is rounded
  // to cents first, and the totals are derived from the rounded lines, so the
  // lines add up to the total and fee + net always equals the money received.
  const fvC = toCents(fv);
  const fixedC = toCents(fixed);
  const payC = toCents(pay);
  const listingC = toCents(listing);
  const fee = toCents(fvC + fixedC + payC + listingC);
  // Money the seller actually gets from the sale: item price where shipping
  // is paid straight to the platform, item + shipping where it passes through.
  const inflow = receivesShip ? gross : price;
  return { fv: fvC, fixed: fixedC, pay: payC, listing: listingC, fee, net: toCents(inflow - fee), gross, tiered, receivesShip };
}

// Round to cents the way a receipt reads.
export const toCents = (x) => Math.round(Number((x * 100).toFixed(6))) / 100;
export const money = (x) => '$' + toCents(x).toFixed(2);

// One-line fee structure for a platform, built from its config only (used by
// the compare table and the home-page cards).
export function feeSummary(r) {
  if (!r) return '';
  const parts = [];
  if (r.final_value_percent) {
    parts.push(
      `${r.final_value_percent}%` +
        (r.min_commission != null
          ? ` (flat ${money(r.min_commission)} under $${r.commission_threshold_price})`
          : '')
    );
  }
  if (r.per_order_fixed_under_10 != null && r.per_order_fixed_under_10 !== r.per_order_fixed) {
    parts.push(`${money(r.per_order_fixed_under_10)} to ${money(r.per_order_fixed)} per order`);
  } else if (r.per_order_fixed) {
    parts.push(`${money(r.per_order_fixed)} per order`);
  }
  if (r.payment_percent || r.payment_fixed) {
    parts.push(`${r.payment_percent}% + ${money(r.payment_fixed)} processing`);
  }
  if (r.listing_fee_free_per_month && r.listing_fee) {
    parts.push(`${money(r.listing_fee)} listing after ${r.listing_fee_free_per_month} free a month`);
  } else if (r.listing_fee) {
    parts.push(`${money(r.listing_fee)} listing`);
  }
  return parts.join(' + ') || 'no seller fee';
}

// eBay final value fee for one row of config/ebay-categories.yaml.
//   model "portion":   tierN_rate applies to the part of the sale (per item)
//                      between the previous cap and tierN_cap; a tier without
//                      a cap takes everything above (e.g. 2.35% over $7,500).
//   model "threshold": athletic shoes — low_rate below `threshold`, high_rate
//                      at or above, each with its own per-order-fee rule.
// Returns null for rows eBay words as a flat switch ("9% if the sale is over
// $2,000"): those are quoted on the page, never computed here.
// ebay = the eBay block of rates.yaml (source of the per-order fee amounts).
export function ebayCategoryFee(cat, total, ebay) {
  if (!cat || cat.model !== 'portion' && cat.model !== 'threshold') return null;
  const t = Number(total);
  if (!Number.isFinite(t) || t < 0 || !ebay) return null;
  let fv;
  let perOrder;
  if (cat.model === 'portion') {
    fv = 0;
    let lower = 0;
    for (let i = 1; cat[`tier${i}_rate`] != null; i++) {
      const rate = Number(cat[`tier${i}_rate`]);
      const cap = cat[`tier${i}_cap`] != null ? Number(cat[`tier${i}_cap`]) : Infinity;
      fv += (Math.max(0, Math.min(t, cap) - lower) * rate) / 100;
      lower = cap;
    }
    perOrder = cat.per_order_fee === true;
  } else {
    const thr = Number(cat.threshold);
    const low = t < thr;
    fv = (t * Number(low ? cat.low_rate : cat.high_rate)) / 100;
    perOrder = low ? cat.low_per_order_fee === true : cat.high_per_order_fee === true;
  }
  let fixed = 0;
  if (perOrder) {
    fixed = t <= 10 && ebay.per_order_fixed_under_10 != null
      ? Number(ebay.per_order_fixed_under_10)
      : Number(ebay.per_order_fixed) || 0;
  }
  // Same cents convention as computeFees: the percentage part is rounded to
  // cents before the per-order fee is added (eBay's own worked example does
  // this: "13.25% of $7,500 + 2.35% of $2,570 + $0.40 = $1,054.55").
  const fvC = toCents(fv);
  return { fv: fvC, fixed, fee: toCents(fvC + fixed) };
}
