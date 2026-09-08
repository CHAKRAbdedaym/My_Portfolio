import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/** Generated at build time and served at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
