import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kontext - AI-Powered News Blog",
    short_name: "Kontext",
    description:
      "Transform complex technology news into engaging, personalized blog posts with AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#3B82F6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
