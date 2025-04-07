type GenMetadataOptions = {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  indexing?: boolean;
};

export default function genMetadata({
  title = "Speedy Utils",
  description = "SpeedyUtils offers a wide range of free online tools to boost your productivity and simplify everyday tasks.",
  keywords = "online tools, free tools, utilities, productivity tools, SEO tools, SpeedyUtils",
  canonicalUrl = "https://www.speedyutils.com",
  indexing = true,
}: GenMetadataOptions) {
  const defaultOgImage = "/og-banner.png";

  return {
    title,
    description,
    keywords,
    metadataBase: new URL("https://www.speedyutils.com"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl, // Self-referencing alternate
        // Future support for other languages
      },
    },
    robots: indexing
      ? {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: false,
        },
    openGraph: {
      type: "website",
      siteName: "Speedy Utils",
      locale: "en_IN",
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${title} - Speedy Utils preview`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
      site: "@SpeedyUtils",     // Replace with your actual Twitter handle if you have one
      creator: "@SpeedyUtils",  // Replace with your actual Twitter handle
    },
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#121212" },
    ],
    viewport:
      "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    other: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block",
      "msapplication-TileColor": "#ffffff",
      "format-detection": "telephone=no",
      "color-scheme": "light dark",
      "referrer": "no-referrer-when-downgrade",
      category:
        "Text Writing, Development, SEO Web, Image Graphics, Math Conversion, Security Encryption, Productivity",
      rating: "general",
      language: "en",
      author: "SpeedyUtils Team",
      applicationName: "Speedy Utils",
    },
  };
}
