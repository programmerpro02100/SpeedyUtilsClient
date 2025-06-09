'use client';

import React, { useState } from 'react';
import styles from './FaviconGenerator.module.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const FaviconGenerator: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [appName, setAppName] = useState<string>('My App');
    const [bgColor, setBgColor] = useState<string>('#ffffff');
    const [padding, setPadding] = useState<number>(0.1);

    function encodeICO(pngBuffers: ArrayBuffer[]): Uint8Array {
        /*
        Builds ICO file from PNG images.
        Supports PNG-encoded images directly (modern Windows supports this).
        */

        const count = pngBuffers.length;
        let offset = 6 + count * 16; // header + directory entries size
        const directoryEntries: Uint8Array[] = [];
        const parts: Uint8Array[] = [];

        for (let i = 0; i < count; i++) {
            const png = new Uint8Array(pngBuffers[i]);
            const size = png.length;

            // ICO entry fields:
            // 1 byte: width (0 means 256)
            // 1 byte: height (0 means 256)
            // 1 byte: color palette (0 for PNG)
            // 1 byte: reserved (0)
            // 2 bytes: color planes (1)
            // 2 bytes: bits per pixel (32)
            // 4 bytes: size of image data in bytes
            // 4 bytes: offset of image data from start of file

            const canvasSize = Math.sqrt(png.length) || 256; // approximation fallback
            // Actually we know sizes beforehand, so better to pass sizes explicitly

            // Instead, let’s just extract size from PNG IHDR chunk (bytes 16–19: width, 20–23: height)
            // PNG IHDR chunk is at fixed place
            const dv = new DataView(png.buffer);
            const width = dv.getUint32(16, false); // big endian
            const height = dv.getUint32(20, false);

            const entry = new Uint8Array(16);
            entry[0] = width >= 256 ? 0 : width;  // width byte
            entry[1] = height >= 256 ? 0 : height; // height byte
            entry[2] = 0; // color palette
            entry[3] = 0; // reserved
            entry[4] = 1; // color planes (low byte)
            entry[5] = 0; // color planes (high byte)
            entry[6] = 32; // bits per pixel (low byte)
            entry[7] = 0;  // bits per pixel (high byte)

            // size (4 bytes little endian)
            entry[8] = size & 0xff;
            entry[9] = (size >> 8) & 0xff;
            entry[10] = (size >> 16) & 0xff;
            entry[11] = (size >> 24) & 0xff;

            // offset (4 bytes little endian)
            entry[12] = offset & 0xff;
            entry[13] = (offset >> 8) & 0xff;
            entry[14] = (offset >> 16) & 0xff;
            entry[15] = (offset >> 24) & 0xff;

            directoryEntries.push(entry);
            parts.push(png);

            offset += size;
        }

        // ICO Header (6 bytes)
        // Reserved 2 bytes = 0
        // Type 2 bytes = 1 (icon)
        // Count 2 bytes = number of images

        const header = new Uint8Array(6);
        header[2] = 1;
        header[4] = count & 0xff;
        header[5] = (count >> 8) & 0xff;

        // Concatenate header + directory entries + images

        const totalSize = offset;
        const output = new Uint8Array(totalSize);
        output.set(header, 0);

        let pointer = 6;
        for (const dir of directoryEntries) {
            output.set(dir, pointer);
            pointer += dir.length;
        }
        for (const part of parts) {
            output.set(part, pointer);
            pointer += part.length;
        }

        return output;
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const generateIcons = async () => {
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = async () => {
            const zip = new JSZip();
            const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];
            const pngBuffers: ArrayBuffer[] = [];

            for (const size of sizes) {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                if (!ctx) continue;

                // Background
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, size, size);

                // Draw image with padding
                const iconSize = size * (1 - padding);
                const offset = (size - iconSize) / 2;
                ctx.drawImage(img, offset, offset, iconSize, iconSize);

                // PNG
                const pngBlob = await new Promise<Blob | null>((resolve) =>
                    canvas.toBlob((b) => resolve(b), 'image/png')
                );

                if (pngBlob) {
                    const arrayBuffer = await pngBlob.arrayBuffer();
                    pngBuffers.push(arrayBuffer);
                    zip.file(`favicon-${size}x${size}.png`, pngBlob);
                }
            }

            // Generate ICO
            // After generating pngBuffers (array of ArrayBuffer of PNG images)...

            const icoUint8Array = encodeICO(pngBuffers);
            const icoBlob = new Blob([icoUint8Array], { type: 'image/x-icon' });
            zip.file('favicon.ico', icoBlob);


            // Manifest.json
            const manifest = {
                name: appName,
                short_name: appName,
                icons: sizes.map((size) => ({
                    src: `favicon-${size}x${size}.png`,
                    sizes: `${size}x${size}`,
                    type: 'image/png',
                })),
                start_url: '/',
                display: 'standalone',
            };
            zip.file('manifest.json', JSON.stringify(manifest, null, 2));

            // HTML Snippet
            const htmlSnippet = `
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="favicon-180x180.png">
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="${bgColor}">
      `;
            zip.file('snippet.html', htmlSnippet);

            // Save ZIP
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'favicons.zip');
        };
    };

    return (
        <div className={styles.container}>
            {/* <h1 className={styles.heading}>Advanced Favicon & App Icon Generator</h1> */}
            <p className={styles.description}>
                Upload your logo/image and generate optimized favicon.ico, app icons, manifest.json, and HTML snippet.
            </p>

            <div className={styles.uploadSection}>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                />
            </div>

            <div className={styles.optionsSection}>
                <label>
                    App Name:{' '}
                    <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        className={styles.textInput}
                    />
                </label>
                <label>
                    Background Color:{' '}
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                    />
                </label>
                <label>
                    Padding (0 to 0.5):{' '}
                    <input
                        type="range"
                        min="0"
                        max="0.5"
                        step="0.01"
                        value={padding}
                        onChange={(e) => setPadding(parseFloat(e.target.value))}
                    />
                </label>
            </div>

            {previewUrl && (
                <div className={styles.previewSection}>
                    <p className={styles.previewLabel}>Preview:</p>
                    <img src={previewUrl} alt="Preview" className={styles.previewImage} />
                </div>
            )}

            <button
                className={styles.generateButton}
                onClick={generateIcons}
                disabled={!file}
            >
                Generate Icons & Download ZIP
            </button>
        </div>
    );
};

export default FaviconGenerator;
