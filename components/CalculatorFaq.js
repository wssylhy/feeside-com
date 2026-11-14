import { jsonLd, faqJsonLd } from '../lib/seo';

// Per-calculator FAQ block. Questions mirror what US resellers actually type
// into search; answers are built by the page from the loaded platform config —
// no numbers hardcoded here. Pages only pass faqs when the platform's rates
// are verified, so unverified platforms render nothing.
export default function CalculatorFaq({ label, faqs }) {
  const visible = (faqs || []).filter((f) => f.q && f.a);
  if (visible.length === 0) return null;
  return (
    <>
      {jsonLd(faqJsonLd(visible))}
      <style>{`
        .calc-faq { max-width: 660px; margin: 2.2rem auto 0; }
        .calc-faq h2 { font-size: 1.15rem; }
        .calc-faq h3 { font-size: 0.98rem; margin: 1rem 0 0.25rem; }
        .calc-faq p { margin: 0 0 0.4rem; color: #444; }
        .calc-faq .faq-src { font-size: 0.78rem; color: #666; margin-top: 0.9rem; }
      `}</style>
      <section className="calc-faq">
        <h2>Frequently asked questions</h2>
        {visible.map(({ q, a }) => (
          <div key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
        <p className="faq-src">
          Numbers from {label}&apos;s official fee page — collected by automated
          scan and cross-checked by hand before display.
        </p>
      </section>
    </>
  );
}
