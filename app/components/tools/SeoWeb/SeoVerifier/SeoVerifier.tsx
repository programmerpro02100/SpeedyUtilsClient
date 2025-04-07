'use client';

import React, { useState } from 'react';
import styles from './SeoVerifier.module.css';
import { Button, Form, Card, Spinner, Alert, ProgressBar, Collapse } from 'react-bootstrap';
import * as cheerio from 'cheerio';
import { ApiFetch } from '@/utils/ApiFetch';

interface SeoResult {
  status: number;
  statusText: string;
  finalUrl: string;
  title?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonical?: string;
  h1Count: number;
  h1Content?: string;
  wordCount: number;
  linkCount: number;
  internalLinks: number;
  externalLinks: number;
  hasFavicon: boolean;
  headers: Record<string, string>;
  lang?: string;
  charset?: string;
  robotsMeta?: string;
  hasSitemap: boolean;
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
  imgCount: number;
  imgMissingAlt: number;
  viewportOk: boolean;
  seoScore: number;
  grade: string;
  errors: string[];
}

export default function SeoVerifier() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<SeoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRawHeaders, setShowRawHeaders] = useState(true);

  const analyzeHTML = (html: string, headers: Record<string, string>, finalUrl: string, status: number, statusText: string): SeoResult => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');
    console.log(metaDescription)
    const metaKeywords = $('meta[name="keywords"]').attr('content');
    const canonical = $('link[rel="canonical"]').attr('href') || undefined;

    const h1Tags = $('h1');
    const h1Count = h1Tags.length;
    const h1Content = h1Tags.first().text();

    const wordCount = $('body').text().trim().split(/\s+/).length;

    const links = $('a');
    const linkCount = links.length;
    let internalLinks = 0;
    let externalLinks = 0;
    links.each((_, el) => {
      const href = $(el).attr('href');
      if (href?.startsWith('/') || href?.includes(new URL(finalUrl).hostname)) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    });

    const hasFavicon = $('link[rel="icon"]').length > 0 || $('link[rel="shortcut icon"]').length > 0;
    const lang = $('html').attr('lang') || undefined;
    const charset = $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content')?.split('charset=')[1];
    const robotsMeta = $('meta[name="robots"]').attr('content') || null;
    const hasSitemap = html.includes('sitemap.xml') || $('a[href*="sitemap.xml"]').length > 0;

    const ogTags: Record<string, string> = {};
    $('meta[property^="og:"]').each((_, el) => {
      const property = $(el).attr('property');
      const content = $(el).attr('content');
      if (property && content) ogTags[property] = content;
    });

    const twitterTags: Record<string, string> = {};
    $('meta[name^="twitter:"]').each((_, el) => {
      const name = $(el).attr('name');
      const content = $(el).attr('content');
      if (name && content) twitterTags[name] = content;
    });

    const imgs = $('img');
    const imgCount = imgs.length;
    let imgMissingAlt = 0;
    imgs.each((_, el) => {
      if (!$(el).attr('alt')) imgMissingAlt++;
    });

    const viewportOk = $('meta[name="viewport"]').length > 0;

    // Duplicate meta checks
    const metaTags = $('meta[name="description"]').toArray();
    const errors: string[] = [];
    if (!metaDescription) errors.push('Missing meta description');
    if (metaTags.length > 1) errors.push('Duplicate meta description tags');
    if (!canonical) errors.push('Missing canonical link');
    if (!hasFavicon) errors.push('Missing favicon');
    if (wordCount < 250) errors.push('Too few words on the page');
    if (h1Count === 0) errors.push('Missing H1 tag');
    if (internalLinks < 5) errors.push('Too few internal links');
    if (!viewportOk) errors.push('Missing viewport meta tag');
    if (!robotsMeta) errors.push('Missing robots meta tag');
    if (!hasSitemap) errors.push('No sitemap detected');
    if (imgMissingAlt > 0) errors.push(`${imgMissingAlt} images missing alt text`);

    // SEO score
    let score = 100;
    score -= errors.length * 5;
    if (score < 0) score = 0;

    let grade = 'A';
    if (score < 90) grade = 'B';
    if (score < 75) grade = 'C';
    if (score < 60) grade = 'D';
    if (score < 40) grade = 'F';

    return {
      status,
      statusText,
      finalUrl,
      title,
      metaDescription,
      metaKeywords,
      canonical,
      h1Count,
      h1Content,
      wordCount,
      linkCount,
      internalLinks,
      externalLinks,
      hasFavicon,
      headers,
      lang,
      charset,
      robotsMeta: robotsMeta!,
      hasSitemap,
      ogTags,
      twitterTags,
      imgCount,
      imgMissingAlt,
      viewportOk,
      seoScore: score,
      grade,
      errors,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const response = await ApiFetch('/seo-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to fetch page content.');

      const { html, headers, finalUrl, status, statusText } = await response.json();
      const result = analyzeHTML(html, headers, finalUrl, status, statusText);
      setResult(result);
    } catch (err: any) {
      setError(err.message || 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={styles.card}>
      <Card.Body>
        <h6 className="fw-bold">Enter URL</h6>
        <Form onSubmit={handleSubmit} className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" className="mt-2" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : 'Analyze'}
          </Button>
        </Form>

        {error && <Alert variant="danger">{error}</Alert>}

        {result && (
          <>
            <h4 className="mt-4">SEO Results for {result.finalUrl}</h4>
            <ProgressBar now={result.seoScore} label={`${result.seoScore}%`} className="mb-3" variant={result.seoScore > 80 ? 'success' : result.seoScore > 60 ? 'warning' : 'danger'} />
            <p><strong>Grade:</strong> {result.grade}</p>
            <ul className={styles.resultList}>
              <li><strong>Status:</strong> {result.status} {result.statusText}</li>
              <li><strong>Title:</strong> {result.title}</li>
              <li><strong>Meta Description:</strong> {result.metaDescription}</li>
              <li><strong>Meta Keywords:</strong> {result.metaKeywords}</li>
              <li><strong>Canonical:</strong> {result.canonical}</li>
              <li><strong>H1 Tags:</strong> {result.h1Count} - {result.h1Content}</li>
              <li><strong>Word Count:</strong> {result.wordCount}</li>
              <li><strong>Lang:</strong> {result.lang}</li>
              <li><strong>Charset:</strong> {result.charset}</li>
              <li><strong>Viewport Tag:</strong> {result.viewportOk ? 'Yes' : 'No'}</li>
              <li><strong>Robots Meta:</strong> {result.robotsMeta || 'Missing'}</li>
              <li><strong>Sitemap Detected:</strong> {result.hasSitemap ? 'Yes' : 'No'}</li>
              <li><strong>Image Alt Check:</strong> {result.imgCount - result.imgMissingAlt}/{result.imgCount} have alt text</li>
              <li><strong>Internal Links:</strong> {result.internalLinks}</li>
              <li><strong>External Links:</strong> {result.externalLinks}</li>
              <li><strong>Has Favicon:</strong> {result.hasFavicon ? 'Yes' : 'No'}</li>
            </ul>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setShowRawHeaders(!showRawHeaders)}
              className="mb-2"
            >
              {showRawHeaders ? 'Hide Headers' : 'Show Raw HTTP Headers'}
            </Button>
            <Collapse in={showRawHeaders}>
              <pre className={styles.headers}>{JSON.stringify(result.headers, null, 2)}</pre>
            </Collapse>

            <h5 className="mt-4">Open Graph Preview</h5>
            {result.ogTags['og:image'] && (
              <img src={result.ogTags['og:image']} alt="OG Preview" className="mb-2" style={{ maxWidth: '100%' }} />
            )}
            <p><strong>{result.ogTags['og:title']}</strong></p>
            <p>{result.ogTags['og:description']}</p>

            {result.errors.length > 0 && (
              <Alert variant="warning">
                <h6>⚠️ SEO Issues Found:</h6>
                <ul>
                  {result.errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </Alert>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}
