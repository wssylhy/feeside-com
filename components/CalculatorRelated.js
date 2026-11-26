import Link from 'next/link';
import { guidesForPlatform } from '../lib/guides';

// "Fee guides about X" block under each calculator: contextual links from the
// site's strongest pages to every guide that covers the platform. The list is
// derived from each guide's frontmatter, so new guides are linked automatically.
export default function CalculatorRelated({ platformKey, label }) {
  const guides = guidesForPlatform(platformKey, 9);
  if (!guides.length) return null;
  return (
    <section className="calc-related">
      <h2>{label} fee guides</h2>
      <ul>
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={g.path}>{g.label}</Link>
          </li>
        ))}
      </ul>
      <p className="meta-line">
        Comparing platforms? See the <Link href="/guides/fees-comparison-table/">fees comparison table</Link>{' '}
        and the <Link href="/sheet/">printable fee sheet</Link>.
      </p>
    </section>
  );
}
