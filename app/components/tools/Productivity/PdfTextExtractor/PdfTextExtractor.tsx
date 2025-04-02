"use client";

import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import styles from "./PdfTextExtractor.module.css";
import { Card, Button, Spinner } from "react-bootstrap";

// Set workerSrc manually for Next.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf-worker/pdf.worker.min.mjs";

const PDFTextExtractor = () => {
  const [text, setText] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf-worker/pdf.worker.min.mjs";
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setText("");

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      if (reader.result) {
        try {
          const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
          let extractedText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map(item => (item as any).str).join(" ") + "\n";
          }

          setText(extractedText);
        } catch (error) {
          console.error("Error extracting text:", error);
          setText("⚠️ Failed to extract text.");
        } finally {
          setLoading(false);
        }
      }
    };
  };

  return (
    <Card className={`${styles.card} card`}>
      <Card.Body>
        <label htmlFor="pdfUpload" className={styles.fileLabel}>
          <input type="file" id="pdfUpload" accept="application/pdf" onChange={handleFileChange} className={styles.fileInput} />
          Select a PDF File
        </label>

        {fileName && <p className={styles.fileName}>📌 Selected: <strong>{fileName}</strong></p>}

        {loading && <Spinner animation="border" variant="primary" className={styles.loader} />}

        {text && (
          <div className={styles.textOutput}>
            <h3>📝 Extracted Text:</h3>
            <textarea className={styles.textArea} value={text} readOnly />
          </div>
        )}

        {!text && !loading && <p className={styles.placeholder}>📜 Extracted text will appear here.</p>}

        {text && (
          <Button variant="success" className={styles.copyButton} onClick={() => navigator.clipboard.writeText(text)}>
            📋 Copy Text
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default PDFTextExtractor;
