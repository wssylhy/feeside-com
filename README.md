# p1-feesite

US reseller fee-calculator site (P1). Next.js 15, static export, no runtime
dependencies beyond React. The strongest hook is the cross-platform payout
comparator; the foundation is the config fee library plus automated change
detection.

## Structure

```
config/rates.yaml       single source of truth for fee numbers (null until collected)
lib/rates.js            dependency-free parser for the rates.yaml subset (build-time read)
app/                    pages: home, /compare, 6 per-platform calculators
components/             client-side calculator + comparator (render nulls as pending)
.github/workflows/      rates-scan / serp-sample / keywords (GitHub US runners ONLY)
.data/                  workflow output: freshness/ serp/ keywords/ (created by Actions)
```

## Run

```
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static export -> out/
```

## Red lines

1. Fee numbers live ONLY in `config/rates.yaml`. Pages and articles never
   hardcode rates; every value renders from config or shows the pending state.
2. All scraping (fee pages, SERP sampling, keyword demand signals) runs on
   GitHub Actions US runners. Local machines consume `.data/` files only.
3. A rate value becomes visible only after the automated scan AND a human
   cross-check against the official page (`verified: true`). Until then the
   UI shows the pending placeholder — no invented numbers, ever.
4. Disappearing for 60 days must not break the numbers: workflows re-scan on
   a schedule and flag config diffs for review.
