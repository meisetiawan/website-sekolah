import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  webpack(config) {
    const oneOfRule = config.module.rules.find(
      (rule: any) => Array.isArray(rule.oneOf)
    );
    if (!oneOfRule) return config;
    oneOfRule.oneOf.forEach((rule: any) => {
      if (
        rule.test &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
      ) {
        rule.exclude = /\.svg$/i;
      }
    });
    oneOfRule.oneOf.unshift({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
