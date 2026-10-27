'use client';

import { useState } from 'react';

const PENDING_ZH = '费率数据待采集核验';

function money(n) {
  return '$' + n.toFixed(2);
}

function fmtPercent(v) {
  return v == null ? '待采集' : v + '%';
}

function fmtMoney(v) {
  return v == null ? '待采集' : money(v);
}

// Cross-platform comparator. Rows sort by net payout once rates exist;
// while rates are null everything shows the pending placeholder.
export default function Comparator({ platforms }) {
  const [price, setPrice] = useState('');

  const p = parseFloat(price) || 0;
  const anyReady = platforms.some(
    (e) => e.r.final_value_percent != null && e.r.payment_percent != null
  );

  const rows = platforms
    .map((e) => {
      const r = e.r;
      const ready = r.final_value_percent != null && r.payment_percent != null;
      const net = ready
        ? p -
          p * (r.final_value_percent / 100) -
          (r.per_order_fixed || 0) -
          (p * (r.payment_percent / 100) + (r.payment_fixed || 0)) -
          (r.listing_fee || 0)
        : null;
      return { ...e, net };
    })
    .sort((a, b) => (b.net ?? -Infinity) - (a.net ?? -Infinity));

  return (
    <div className="card">
      <h2>What you keep on each platform</h2>

      {!anyReady && (
        <div className="pending" role="status">
          <p className="pending-zh">{PENDING_ZH}</p>
          <p className="pending-en">Fee data is pending collection and human verification.</p>
        </div>
      )}

      <div className="fields">
        <label>
          Sale price, same item everywhere (USD)
          <input
            inputMode="decimal"
            value={price}
            placeholder="100"
            disabled={!anyReady}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </div>

      <table className="compare">
        <thead>
          <tr>
            <th>Platform</th>
            <th className="num">Final value %</th>
            <th className="num">Fixed / order</th>
            <th className="num">Payment %</th>
            <th className="num">Payment fixed</th>
            <th className="num">Listing fee</th>
            <th className="num">You keep</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>{row.label}{row.r.verified ? null : ' ·'}</td>
              <td className="num">{fmtPercent(row.r.final_value_percent)}</td>
              <td className="num">{fmtMoney(row.r.per_order_fixed)}</td>
              <td className="num">{fmtPercent(row.r.payment_percent)}</td>
              <td className="num">{fmtMoney(row.r.payment_fixed)}</td>
              <td className="num">{fmtMoney(row.r.listing_fee)}</td>
              <td className="num">{row.net == null ? '待采集' : <strong>{money(row.net)}</strong>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="meta-line">
        Platforms marked · have unverified or missing data. Rows sort by payout once every rate is verified.
      </p>
    </div>
  );
}
