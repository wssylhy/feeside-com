'use client';

import { useState } from 'react';
import { computeFees, money, sellerReceivesShipping } from '../lib/fees';

const PENDING_NOTE =
  'Fee data is pending collection and cross-check — numbers unlock as soon as they pass.';

// Client calculator. Receives one platform's rates from a server component;
// renders numbers ONLY when the config supplies them, never otherwise. All
// math lives in lib/fees.js (shared with the compare table and the guides).
export default function FeeCalculator({ label, rates }) {
  const [price, setPrice] = useState('');
  const [shipping, setShipping] = useState('0');
  const [paidListings, setPaidListings] = useState(false);

  const r = rates || {};
  const hasCore = r.final_value_percent != null && r.payment_percent != null;
  const receivesShip = sellerReceivesShipping(r);

  const p = parseFloat(price) || 0;
  const s = parseFloat(shipping) || 0;
  const out = hasCore ? computeFees(r, p, s, { paidListings }) : null;
  const minC = r.min_commission;
  const thr = r.commission_threshold_price != null ? Number(r.commission_threshold_price) : null;

  const fvLabel =
    `Final value fee (${r.final_value_percent}%` +
    (r.fee_base === 'item_only' ? ' of the item price' : ' of the sale total') +
    (minC != null ? (thr != null ? `, flat ${money(minC)} under $${thr}` : `, min ${money(minC)}`) : '') +
    ')';
  const freeListings = Number(r.listing_fee_free_per_month) || 0;

  return (
    <div className="card">
      <h2>{label} fee calculator</h2>

      {!hasCore && (
        <div className="pending" role="status">
          <p>{PENDING_NOTE}</p>
        </div>
      )}

      <div className="fields">
        <label>
          Sale price (USD)
          <input
            inputMode="decimal"
            value={price}
            placeholder="100"
            disabled={!hasCore}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        {receivesShip ? (
          <label>
            Shipping charged (USD)
            <input
              inputMode="decimal"
              value={shipping}
              disabled={!hasCore}
              onChange={(e) => setShipping(e.target.value)}
            />
          </label>
        ) : (
          <p className="meta-line ship-note">
            The buyer pays shipping straight to {label}, so it never enters your payout.
          </p>
        )}
      </div>

      {out && (
        <>
          <table className="breakdown">
            <tbody>
              <tr><td>{fvLabel}</td><td className="num">−{money(out.fv)}</td></tr>
              <tr><td>Fixed fee per order{out.tiered ? ' (order of $10 or less)' : ''}</td><td className="num">−{money(out.fixed)}</td></tr>
              <tr><td>Payment processing ({r.payment_percent}%)</td><td className="num">−{money(out.pay)}</td></tr>
              {freeListings ? (
                <tr>
                  <td>
                    Insertion fee
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={paidListings}
                        onChange={(e) => setPaidListings(e.target.checked)}
                      />
                      I&apos;ve used up my {freeListings} free listings this month
                    </label>
                  </td>
                  <td className="num">−{money(out.listing)}</td>
                </tr>
              ) : (
                <tr><td>Listing fee</td><td className="num">−{money(out.listing)}</td></tr>
              )}
            </tbody>
          </table>
          {p > 0 ? (
            <p className="net">You keep: <strong>{money(out.net)}</strong></p>
          ) : (
            <p className="net meta-line">Enter a price to see what you keep.</p>
          )}
          {receivesShip && s > 0 && (
            <p className="meta-line">
              Includes the {money(s)} shipping charged. The cost of the label is not deducted.
            </p>
          )}
        </>
      )}

      <p className="meta-line">
        {r.verified ? 'Verified against official page' : 'Unverified'}
        {' · '}
        {r.scraped_date ? 'data from ' + r.scraped_date : 'no data yet'}
        {r.source_url ? <> · <a href={r.source_url}>official source</a></> : null}
      </p>
      {r.tax_in_fee_base === true && (
        <p className="meta-line">
          {label} also applies its percentage to the sales tax collected on the order. Tax varies by
          state and is not included here, so the real fee runs a little higher.
        </p>
      )}
    </div>
  );
}
