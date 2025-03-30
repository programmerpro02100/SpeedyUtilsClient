"use client";
import { useState } from "react";
import { Form, Button, Card, Spinner, Alert, Container } from "react-bootstrap";
import styles from "./MetatagChecker.module.css";
import { ApiFetch } from "@/utils/ApiFetch";

export default function MetaTagChecker() {
  const [url, setUrl] = useState("");
  const [metaData, setMetaData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const verify = ()=>{
  try{
    new URL(url);
    return true;
  }
  catch(err){
    setError("Please Enter a Valid URL");
    return false;
  }
 }

  const fetchMetaTags = async () => {
    if(!verify()) return;
    setLoading(true);
    setError("");
    try {
      const response = await ApiFetch(`/seoweb/meta-checker?url=${encodeURIComponent(url)}`);
      if(!response.ok){
         throw new Error("Please Enter a Valid URL")
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMetaData(data);
      }
    } catch (err : any) {
      if(err.message == "Please Enter a Valid URL"){
        setError(err.message);
      }
      else setError("Failed to fetch meta tags.");
    }
    setLoading(false);
  };

  return (
    <Container className={`mt-4 ${styles.container}`}>
      <Form>
        <Form.Group className={styles.inputField}>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
          />
        </Form.Group>
        <Button className={styles.button} onClick={fetchMetaTags} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Check Meta Tags"}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {metaData && (
        <Card className={styles.card}>
          <Card.Body>
            <h4>SEO Score: {metaData.seoScore}/100</h4>

            {metaData.duplicates.length > 0 && (
              <Alert variant="warning">
                <strong>⚠️ Duplicate Meta Tags Found:</strong>
                <ul>
                  {metaData.duplicates.map((tag: string) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </Alert>
            )}

            <h5 className="mt-3">Meta Tags:</h5>
            <pre className={styles.pre}>{JSON.stringify(metaData.metaTags, null, 2)}</pre>

            {metaData.metaTags["og:image"] && (
              <div>
                <h5>Visual Preview:</h5>
                <img src={metaData.metaTags["og:image"][0]} alt="OG Image" className={styles.imagePreview} />
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
