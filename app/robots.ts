import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://khatuna-goguadze.rezoro.chatgpt.site/sitemap.xml",
  };
}
