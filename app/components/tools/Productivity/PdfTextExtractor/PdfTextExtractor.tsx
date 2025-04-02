"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import styles from "./PdfTextExtractor.module.css";
import { Card, Button } from "react-bootstrap";

const PDFTextExtractor = () => {
  const [text, setText] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        if (reader.result) {
          const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
          let extractedText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map(item => (item as any).str).join(" ") + " ";
          }

          setText(extractedText);
        }
      };
    }
  };

  return (
    <Card className={`${styles.card} card`}>
      <Card.Body>
        <h2 className="tool-title">PDF Text Extractor</h2>
        <p className="tool-description">Upload a PDF file to extract its text content.</p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className={styles.fileInput} />
        {fileName && <p className={styles.fileName}>Selected: {fileName}</p>}

        {text && (
          <div className={styles.textOutput}>
            <h3>Extracted Text:</h3>
            <p>{text}</p>
          </div>
        )}

        {!text && <p className={styles.placeholder}>Text will appear here after extraction.</p>}
      </Card.Body>
    </Card>
  );
};

export default PDFTextExtractor;
