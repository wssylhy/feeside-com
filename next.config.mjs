/** @type {import('next').NextConfig} */
// DEPLOY_BASE enables the GitHub Pages project-site build (/feeside-com);
// unset it produces the canonical root-domain export for feeside.com.
const base = process.env.DEPLOY_BASE || undefined;

const nextConfig = {
  output: 'export',
  ...(base ? { basePath: base, assetPrefix: base } : {}),
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
