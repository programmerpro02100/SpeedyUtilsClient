'use client';

import React, { useState } from 'react';
import styles from './SeoVerifier.module.css';
import { Button, Form, Card, Spinner, Alert } from 'react-bootstrap';
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
  errors: string[];
}

export default function SeoVerifier() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<SeoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeHTML = (html: string, headers: Record<string, string>, finalUrl: string, status: number, statusText: string): SeoResult => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');
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

    const errors: string[] = [];
    if (!metaDescription) errors.push('Missing meta description');
    if (!canonical) errors.push('Missing canonical link');
    if (!hasFavicon) errors.push('Missing favicon');
    if (wordCount < 250) errors.push('Too few words on the page');
    if (h1Count === 0) errors.push('Missing H1 tag');
    if (internalLinks < 5) errors.push('Too few internal links');

    return {
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
      finalUrl,
      status,
      statusText,
      errors
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
            <h4>SEO Results for {result.finalUrl}</h4>
            <ul className={styles.resultList}>
              <li><strong>Status:</strong> {result.status} {result.statusText}</li>
              <li><strong>Title:</strong> {result.title}</li>
              <li><strong>Meta Description:</strong> {result.metaDescription}</li>
              <li><strong>Meta Keywords:</strong> {result.metaKeywords}</li>
              <li><strong>Canonical:</strong> {result.canonical}</li>
              <li><strong>H1 Tags:</strong> {result.h1Count} - {result.h1Content}</li>
              <li><strong>Word Count:</strong> {result.wordCount}</li>
              <li><strong>Total Links:</strong> {result.linkCount}</li>
              <li><strong>Internal Links:</strong> {result.internalLinks}</li>
              <li><strong>External Links:</strong> {result.externalLinks}</li>
              <li><strong>Has Favicon:</strong> {result.hasFavicon ? 'Yes' : 'No'}</li>
            </ul>

            <h5>HTTP Headers</h5>
            <pre className={styles.headers}>{JSON.stringify(result.headers, null, 2)}</pre>

            {result.errors.length > 0 && (
              <Alert variant="warning">
                <h6>SEO Issues Found:</h6>
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
