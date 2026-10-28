/** @type {import('next').NextConfig} */
// DEPLOY_BASE enables the GitHub Pages project-site build (/feeside-com);
// unset it produces the canonical root-domain export for feeside.com.
const base = process.env.DEPLOY_BASE || undefined;

const nextConfig = {
  output: 'export',
  // GH Pages serves plain static files: extensionless URLs need
  // directory-style output (/calculators/ebay/index.html).
  ...(base ? { basePath: base, assetPrefix: base, trailingSlash: true } : {}),
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
