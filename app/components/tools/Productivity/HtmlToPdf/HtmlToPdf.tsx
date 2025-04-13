'use client';

import { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import styles from './HtmlToPdf.module.css';
import { Spinner } from 'react-bootstrap';

const HtmlToPdfConverter = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [pdfSize, setPdfSize] = useState('a4');
  const [customWidth, setCustomWidth] = useState(210);
  const [customHeight, setCustomHeight] = useState(297);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margins, setMargins] = useState({ top: 10, bottom: 10, left: 10, right: 10 });
  const [dpi, setDpi] = useState(300);  // Default DPI
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleHtmlUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/html') {
      const text = await file.text();
      setHtmlContent(text);
    }
  };

  const handlePreview = () => {
    if (!htmlContent) return;
    setLoadingPreview(true);
    setTimeout(() => {
      if (iframeRef.current) {
        const doc = iframeRef.current.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(htmlContent);
          doc.close();
        }
      }
      setLoadingPreview(false);
    }, 300); // Simulate loading delay
  };

  const generatePdf = () => {
    if (!htmlContent) return;
    setLoadingPdf(true);

    const opt: any = {
      margin: [margins.top, margins.left, margins.bottom, margins.right],
      filename: 'converted.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'mm',
        format: pdfSize === 'custom' ? [customWidth, customHeight] : pdfSize,
        orientation: orientation,
        compress: true,
        resolution: dpi,
      },
    };

    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    document.body.appendChild(tempElement);

    html2pdf()
      .set(opt)
      .from(tempElement)
      .save()
      .finally(() => {
        document.body.removeChild(tempElement);
        setLoadingPdf(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Upload HTML File:</label>
        <input
          type="file"
          accept=".html"
          className={styles.fileInput}
          onChange={handleHtmlUpload}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Or Paste HTML:</label>
        <textarea
          className={styles.textarea}
          rows={10}
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>PDF Size:</label>
        <select
          className={styles.select}
          value={pdfSize}
          onChange={(e) => setPdfSize(e.target.value)}
        >
          <option value="a4">A4 (210 x 297 mm)</option>
          <option value="a5">A5 (148 x 210 mm)</option>
          <option value="letter">Letter (216 x 279 mm)</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {pdfSize === 'custom' && (
        <div className={styles.customSize}>
          <label className={styles.customSizeLabel}>
            Width (mm):
            <input
              type="number"
              className={styles.numberInput}
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
            />
          </label>
          <label className={styles.customSizeLabel}>
            Height (mm):
            <input
              type="number"
              className={styles.numberInput}
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      <div className={styles.inputGroup}>
        <label className={styles.label}>Orientation:</label>
        <select
          className={styles.select}
          value={orientation}
          onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Margins (mm):</label>
        <div className={styles.marginInputs}>
          <label>
            Top:
            <input
              type="number"
              className={styles.numberInput}
              value={margins.top}
              onChange={(e) => setMargins({ ...margins, top: Number(e.target.value) })}
            />
          </label>
          <label>
            Bottom:
            <input
              type="number"
              className={styles.numberInput}
              value={margins.bottom}
              onChange={(e) => setMargins({ ...margins, bottom: Number(e.target.value) })}
            />
          </label>
          <label>
            Left:
            <input
              type="number"
              className={styles.numberInput}
              value={margins.left}
              onChange={(e) => setMargins({ ...margins, left: Number(e.target.value) })}
            />
          </label>
          <label>
            Right:
            <input
              type="number"
              className={styles.numberInput}
              value={margins.right}
              onChange={(e) => setMargins({ ...margins, right: Number(e.target.value) })}
            />
          </label>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>DPI (Resolution):</label>
        <input
          type="number"
          className={styles.numberInput}
          value={dpi}
          onChange={(e) => setDpi(Number(e.target.value))}
          min="100"
          max="600"
        />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={generatePdf}
          disabled={loadingPdf}
        >
          {loadingPdf ? (
            <>
              <Spinner animation="border" size="sm" /> Generating PDF...
            </>
          ) : (
            'Download PDF'
          )}
        </button>
      </div>

      <div className={styles.previewWrapper} style={{ height: '600px' }}>
        {loadingPreview ? (
          <Spinner animation="border" role="status" />
        ) : (
          <iframe srcDoc={htmlContent} className={styles.iframe} title="PDF Preview" />
        )}
      </div>
    </div>
  );
};

export default HtmlToPdfConverter;
