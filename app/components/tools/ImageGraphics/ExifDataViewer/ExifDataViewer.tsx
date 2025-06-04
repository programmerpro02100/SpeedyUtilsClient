"use client";

import 'leaflet/dist/leaflet.css';
import React, { useState, useRef, useCallback } from "react";
import styles from "./ExifDataViewer.module.css";
import EXIF from "exif-js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const EXIFDataViewer = () => {
    const [metadataList, setMetadataList] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleDownloadZip = () => {
        if (metadataList.length === 0) return;

        const zip = new JSZip();

        metadataList.forEach(({ fileName, metadata }) => {
            const cleanName = fileName.replace(/\.[^/.]+$/, "");
            zip.file(`${cleanName}.json`, JSON.stringify(metadata, null, 2));
        });

        zip.generateAsync({ type: "blob" }).then((blob) => {
            saveAs(blob, "exif-metadata.zip");
        });
    };


    const handleFiles = useCallback((files: FileList | null) => {
        if (!files) return;
        const results: any[] = [];
        setError(null);
        setMetadataList([]);

        Array.from(files).forEach((file) => {
            if (!file.type.startsWith("image/")) {
                setError("Only image files are supported.");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    EXIF.getData(img as any, function (this : any) {
                        const meta = EXIF.getAllTags(this);
                        results.push({ fileName: file.name, metadata: meta });
                        setMetadataList((prev) => [...prev, { fileName: file.name, metadata: meta }]);
                    });
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const convertGPSToDecimal = (gpsData: any) => {
        const [latDeg, latMin, latSec] = gpsData.GPSLatitude;
        const [lonDeg, lonMin, lonSec] = gpsData.GPSLongitude;
        const latRef = gpsData.GPSLatitudeRef;
        const lonRef = gpsData.GPSLongitudeRef;

        const lat = (latDeg + latMin / 60 + latSec / 3600) * (latRef === "S" ? -1 : 1);
        const lon = (lonDeg + lonMin / 60 + lonSec / 3600) * (lonRef === "W" ? -1 : 1);
        return [lat, lon];
    };

    return (
        <div className={styles.container}>
            {/* <h1 className={styles.title}>EXIF Data Viewer</h1> */}
            <p className={styles.subtitle}>Upload or drop multiple images to view metadata</p>

            <div
                className={styles.dropZone}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
            >
                <p>Drag & drop images here or click to upload</p>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    className={styles.input}
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {metadataList.length > 0 && (
                <div className={styles.zipExport}>
                    <button onClick={handleDownloadZip} className={styles.exportButton}>
                        📦 Download All Metadata as ZIP
                    </button>
                </div>
            )}

            {error && <div className={styles.error}>{error}</div>}

            {metadataList.map(({ fileName, metadata }, index) => {
                const hasGPS =
                    metadata?.GPSLatitude && metadata?.GPSLongitude && metadata?.GPSLatitudeRef && metadata?.GPSLongitudeRef;
                const gpsCoords = hasGPS ? convertGPSToDecimal(metadata) : null;

                return (
                    <div key={index} className={styles.metaBox}>
                        <h2>{fileName}</h2>
                        <ul className={styles.metaList}>
                            {Object.entries(metadata).map(([key, value]) => {
                                if (key === "thumbnail" && value instanceof Uint8Array) {
                                    const blob = new Blob([value], { type: "image/jpeg" });
                                    const url = URL.createObjectURL(blob);
                                    return (
                                        <li key={key}>
                                            <strong>{key}:</strong>{" "}
                                            <a href={url} download={`${fileName}-thumbnail.jpg`} className={styles.downloadLink}>
                                                Download Thumbnail
                                            </a>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={key}>
                                        <strong>{key}:</strong>{" "}
                                        {Array.isArray(value) ? (
                                            <span>{value.join(", ")}</span>
                                        ) : typeof value === "object" ? (
                                            <pre className={styles.pre}>{JSON.stringify(value, null, 2)}</pre>
                                        ) : (
                                            String(value)
                                        )}

                                    </li>
                                );
                            })}
                        </ul>
                        {gpsCoords && (
                            <div className={styles.mapContainer}>
                                <MapContainer center={gpsCoords as [number, number]} zoom={13} scrollWheelZoom={false} style={{ height: "250px" }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={gpsCoords as [number, number]}>
                                        <Popup>
                                            Image Location <br /> Lat: {gpsCoords[0].toFixed(5)}, Lon: {gpsCoords[1].toFixed(5)}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EXIFDataViewer;
