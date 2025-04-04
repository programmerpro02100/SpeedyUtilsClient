"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, Button, Form, Alert } from "react-bootstrap";
import styles from "./ImageCompressor.module.css";

const ImageCompressor = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [targetSize, setTargetSize] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setOriginalSize(file.size / 1024); // Convert to KB
      setCompressedImage(null);
      setError(null);
    }
  };

  const handleCompress = () => {
    if (!imageFile) return;
    if (!targetSize || targetSize <= 0) {
      setError("Please enter a valid target file size.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Scale image to maintain aspect ratio
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        let quality = 1.0;
        let compressedData = "";

        while (quality > 0) {
          compressedData = canvas.toDataURL("image/jpeg", quality);
          const sizeInKB = (compressedData.length * 3) / 4 / 1024;
          if (sizeInKB <= targetSize) break;
          quality -= 0.05;
        }

        setCompressedImage(compressedData);
      };
    };
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = "compressed-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={`${styles.card} card`}>
      <Card.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className="fw-bold">Select an Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        {imageFile && originalSize && (
          <p className={styles.imageInfo}>Original Size: {originalSize.toFixed(2)} KB</p>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Target Size (KB)</Form.Label>
          <Form.Control
            type="number"
            value={targetSize}
            onChange={(e) => setTargetSize(Number(e.target.value) || "")}
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button className="button" onClick={handleCompress} disabled={!imageFile}>
          Compress
        </Button>
        {compressedImage && (
          <Button className="button ms-2" onClick={handleDownload}>
            Download
          </Button>
        )}

        {imageFile && (
          <div className={styles.previewContainer}>
            <h3>Original Image</h3>
            <Image src={URL.createObjectURL(imageFile)} alt="Original" width={200} height={200} className={styles.preview} />
          </div>
        )}

        {compressedImage && (
          <div className={styles.previewContainer}>
            <h3>Compressed Image</h3>
            <Image src={compressedImage} alt="Compressed" width={200} height={200} className={styles.preview} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ImageCompressor;
