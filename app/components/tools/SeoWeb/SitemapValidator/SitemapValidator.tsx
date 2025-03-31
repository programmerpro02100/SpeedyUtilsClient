"use client";

import { useState } from "react";
import styles from "./SitemapValidator.module.css";
import { Container, Form, Button, Table, Alert, Spinner } from "react-bootstrap";
import { ApiFetch } from "@/utils/ApiFetch";

const validateSitemap = async (url: string) => {
    try {
        const response = await ApiFetch("/proxy", {
            method: 'POST',
            body: JSON.stringify({url})
        });
        if (!response.ok) throw new Error("Invalid Sitemap URL");
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        if (xml.querySelector("parsererror")) throw new Error("Invalid XML Format");
        
        const urls = [...xml.getElementsByTagName("loc")].map(node => node.textContent || "");
        return urls;
    } catch (error : any) {
        return { error: error.message };
    }
};

const checkURLs = async (urls: string[]) => {
    const results = await Promise.all(urls.map(async (url) => {
        try {
            const response = await fetch(url, { method: "HEAD" });
            return { url, status: response.status };
        } catch {
            return { url, status: "Error" };
        }
    }));
    return results;
};

export default function SitemapValidator() {
    const [sitemapUrl, setSitemapUrl] = useState("");
    const [urls, setUrls] = useState<string[]>([]);
    const [results, setResults] = useState<{ url: string; status: string | number }[]>([]);
    const [loading, setLoading] = useState(false);
    
    const handleValidation = async () => {
        setLoading(true);
        const data = await validateSitemap(sitemapUrl);
        if ("error" in data) {
            alert(data.error);
            setLoading(false);
            return;
        }
        setUrls(data);
        const statusResults = await checkURLs(data);
        setResults(statusResults);
        setLoading(false);
    };
    
    return (
        <Container className={styles.validatorContainer}>
            <h2 className={styles.heading}>Sitemap Validator</h2>
            <Form.Group>
                <Form.Control type="url" value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} placeholder="Enter Sitemap URL" className={styles.input} />
            </Form.Group>
            <Button onClick={handleValidation} className={styles.validateBtn} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Validate"}
            </Button>
            {urls.length > 0 && (
                <div className={styles.resultContainer}>
                    <Alert variant="info">Total URLs: {urls.length}</Alert>
                    <h4>URL Status</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(({ url, status }) => (
                                <tr key={url}>
                                    <td>{url}</td>
                                    <td>{status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}