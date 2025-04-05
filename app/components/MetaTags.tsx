type GenMetadataOptions = {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  searchUrlTemplate?: string;
  isToolPage?: boolean; // optional flag to include SoftwareApplication
  indexing?: boolean; // optional flag to enable/disable indexing in search engines
};

export default function genMetadata({
  title = "Speedy Utils",
  description = "SpeedyUtils offers a wide range of free online tools to simplify your tasks.",
  keywords = "online tools, free tools, productivity utilities, SEO tools",
  canonicalUrl = "https://www.speedyutils.com",
  searchUrlTemplate,
  isToolPage = false,
  indexing = true,
}: GenMetadataOptions) {
  const jsonLd: any[] = [];

  if (isToolPage) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: title,
      operatingSystem: "All",
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
    });
  }

  if (searchUrlTemplate) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://www.speedyutils.com",
      potentialAction: {
        "@type": "SearchAction",
        target: `${searchUrlTemplate}{search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });
  }

  return {
    title,
    description,
    keywords,
    metadataBase: new URL("https://www.speedyutils.com"),
    alternates: { canonical: canonicalUrl },
    robots: (indexing)? { index: true, follow: true } : { index: false, follow: false},
    openGraph: {
      type: "website",
      siteName: "Speedy Utils",
      locale: "en_IN",
      title,
      description,
      url: canonicalUrl,
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
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}
