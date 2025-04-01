"use client";

import { useState } from "react";
import JSZip from "jszip";
import styles from "./FileZipConverter.module.css";
import { Button, Card } from "react-bootstrap";

const FileZipConverter = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const createZip = async () => {
    if (!files || files.length === 0) return;
    setIsZipping(true);
    const zip = new JSZip();

    Array.from(files).forEach((file) => {
      zip.file(file.name, file);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  return (
    <Card className={`${styles.card} card`}>
      <Card.Body>
        <h2 className="tool-title">File to ZIP Converter</h2>
        <p className="tool-description">Select multiple files and compress them into a single ZIP archive.</p>
        <input type="file" multiple onChange={handleFileChange} className={styles.fileInput} />
        <Button onClick={createZip} disabled={!files || isZipping} className={`${styles.button} button`}>
          {isZipping ? "Zipping..." : "Download ZIP"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FileZipConverter;