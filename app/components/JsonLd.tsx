'use client';

import Script from 'next/script';

type Props = {
  jsonLd: Record<string, any>;
};

export default function JsonLd({ jsonLd }: Props) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
