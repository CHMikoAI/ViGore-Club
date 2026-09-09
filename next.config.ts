import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Figure (src/components/Figure.tsx) looks in public/images at render time to
  // decide between a real photo and its placeholder. Trace the folder so that
  // check still works on Vercel, where public/ otherwise only lives on the CDN.
  outputFileTracingIncludes: {
    "/*": ["./public/images/**/*"],
  },
};

export default nextConfig;
