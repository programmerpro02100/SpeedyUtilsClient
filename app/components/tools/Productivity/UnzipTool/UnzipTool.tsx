'use client';

import React, { useState } from 'react';
import styles from './UnzipTool.module.css';

export default function ZipExtractor() {
  const [zipContent, setZipContent] = useState<{ path: string; blobUrl: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleZipUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipContent([]);
    setError(null);

    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const JSZip = (await import('jszip')).default;
      const zip = await JSZip.loadAsync(file);
      const entries = Object.keys(zip.files);

      const files = await Promise.all(
        entries.map(async (entry) => {
          const file = zip.files[entry];
          if (!file.dir) {
            const blob = await file.async('blob');
            const blobUrl = URL.createObjectURL(blob);
            return { path: entry, blobUrl };
          }
          return null;
        })
      );

      const filtered = files.filter(Boolean) as { path: string; blobUrl: string }[];
      setZipContent(filtered);
    } catch (err) {
      setError('Failed to extract zip file. Please upload a valid .zip file.');
      console.error(err);
    }
  };

  const handleDownloadAll = () => {
    zipContent.forEach(({ blobUrl, path }) => {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = path.split('/').pop() || path;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>Upload a .zip file to view and download its contents.</p>
      <input type="file" accept=".zip" onChange={handleZipUpload} className={styles.input} />
      {error && <p className={styles.error}>{error}</p>}
      {zipContent.length > 0 && (
        <>
          <button onClick={handleDownloadAll} className={styles.downloadAllBtn}>Download All</button>
          <div className={styles.fileList}>
            {zipContent.map(({ path, blobUrl }, index) => (
              <div key={index} className={styles.fileItem}>
                <span className={styles.fileName}>{path}</span>
                <a href={blobUrl} download={path.split('/').pop()} className={styles.downloadBtn}>Download</a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
