export default function genMetadata(
  title: string = "Speedy Utils",
  description: string = "SpeedyUtils offers a wide range of free online tools to simplify your tasks.",
  keywords: string = "online tools, free tools, productivity utilities, SEO tools"
) {
  return {
    title,
    description,
    keywords,
    metadataBase: new URL("https://speedyutils.com"),
    alternates: { canonical: "https://speedyutils.com" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "SpeedyUtils",
      locale: "en_US",
      title,
      description,
      url: "https://speedyutils.com",
      images: [{ url: "/favicon.ico", width: 1200, height: 630, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/favicon.ico"],
    },
    other: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block",
      "msapplication-TileColor": "#ffffff",
      "format-detection": "telephone=no",
      "content-type": "text/html; charset=UTF-8",
    },
  };
}
