import Head from "next/head";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function MetaTags({
  title = "Speedy Utils",
  description = "SpeedyUtils offers a wide range of free online tools to simplify your tasks.",
  keywords = "online tools, free tools, productivity utilities, SEO tools",
}: MetaTagsProps) {
  return (
    <Head>
      {/* Basic SEO */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      {/* Security */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

      {/* Open Graph (Social Media) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SpeedyUtils" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image" content="/favicon.ico" />

      {/* Misc */}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />

      {/* Dynamic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/"} />

      {/* Favicon & PWA */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}
