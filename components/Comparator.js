'use client';

import Link from 'next/link';
import { useState } from 'react';
import { computeFees, feeSummary, money } from '../lib/fees';

const PENDING_ZH = '费率数据待采集核验';

const ready = (r) => r.final_value_percent != null && r.payment_percent != null;

// Cross-platform comparator. Same fee function as the per-platform
// calculators (lib/fees.js), run on one price with no shipping.
export default function Comparator({ platforms }) {
  const [price, setPrice] = useState('');
  const p = parseFloat(price) || 0;
  const anyReady = platforms.some((e) => ready(e.r));

  const rows = platforms
    .map((e) => ({ ...e, out: ready(e.r) && p > 0 ? computeFees(e.r, p, 0) : null }))
    .sort((a, b) => {
      if (!a.out || !b.out) return 0;
      return b.out.net - a.out.net;
    });

  const notes = platforms.filter((e) => ready(e.r) && (e.r.listing_fee_free_per_month || e.r.listing_fee));

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
            <th>Fee structure</th>
            <th className="num">You keep</th>
            <th className="num">Fees as % of price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>
                <Link href={`/calculators/${row.key}/`}>{row.label}</Link>
                {row.r.verified ? null : ' ·'}
              </td>
              <td className="struct">{ready(row.r) ? feeSummary(row.r) : '待采集'}</td>
              <td className="num">
                {row.out ? <strong>{money(row.out.net)}</strong> : p > 0 ? '待采集' : '—'}
              </td>
              <td className="num">{row.out ? ((row.out.fee / p) * 100).toFixed(1) + '%' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="meta-line">
        Item price only, shipping not included. Rows sort by what you keep once you enter a price.
        {notes.length > 0 && (
          <>
            {' '}
            Listing fees at their default:{' '}
            {notes
              .map((e) =>
                e.r.listing_fee_free_per_month
                  ? `${e.label}'s ${money(e.r.listing_fee)} insertion fee is left out (the first ${e.r.listing_fee_free_per_month} listings a month are free)`
                  : `${e.label}'s ${money(e.r.listing_fee)} listing fee is counted`
              )
              .join('; ')}
            .
          </>
        )}
        {platforms.some((e) => ready(e.r) && !e.r.verified) && ' Platforms marked · have unverified data.'}
      </p>
    </div>
  );
}
