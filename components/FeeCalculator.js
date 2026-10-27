'use client';

import { useState } from 'react';

const PENDING_ZH = '费率数据待采集核验';

function money(n) {
  return '$' + n.toFixed(2);
}

// Client calculator. Receives one platform's rates from a server component;
// renders numbers ONLY when the config supplies them, never otherwise.
export default function FeeCalculator({ label, rates }) {
  const [price, setPrice] = useState('');
  const [shipping, setShipping] = useState('0');

  const r = rates || {};
  const hasCore = r.final_value_percent != null && r.payment_percent != null;

  const p = parseFloat(price) || 0;
  const s = parseFloat(shipping) || 0;
  const gross = p + s;

  const fv = gross * ((r.final_value_percent || 0) / 100);
  const fixed = r.per_order_fixed || 0;
  const pay = gross * ((r.payment_percent || 0) / 100) + (r.payment_fixed || 0);
  const listing = r.listing_fee || 0;
  const net = gross - fv - fixed - pay - listing;

  return (
    <div className="card">
      <h2>{label} fee calculator</h2>

      {!hasCore && (
        <div className="pending" role="status">
          <p className="pending-zh">{PENDING_ZH}</p>
          <p className="pending-en">Fee data is pending collection and human verification.</p>
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
        <label>
          Shipping charged (USD)
          <input
            inputMode="decimal"
            value={shipping}
            disabled={!hasCore}
            onChange={(e) => setShipping(e.target.value)}
          />
        </label>
      </div>

      {hasCore && (
        <>
          <table className="breakdown">
            <tbody>
              <tr><td>Final value fee ({r.final_value_percent}%)</td><td className="num">−{money(fv)}</td></tr>
              <tr><td>Fixed fee per order</td><td className="num">−{money(fixed)}</td></tr>
              <tr><td>Payment processing ({r.payment_percent}%)</td><td className="num">−{money(pay)}</td></tr>
              <tr><td>Listing fee</td><td className="num">−{money(listing)}</td></tr>
            </tbody>
          </table>
          <p className="net">You keep: <strong>{money(net)}</strong></p>
        </>
      )}

      <p className="meta-line">
        {r.verified ? 'Verified against official page' : 'Unverified'}
        {' · '}
        {r.scraped_date ? 'data from ' + r.scraped_date : 'no data yet'}
        {r.source_url ? <> · <a href={r.source_url}>official source</a></> : null}
      </p>
    </div>
  );
}
