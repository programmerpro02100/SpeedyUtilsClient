"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, Button } from "react-bootstrap";
import Editor from "@monaco-editor/react";
import styles from "./MarkdownToHtml.module.css";

const MarkdownToHtmlConverter = () => {
  const [markdown, setMarkdown] = useState("");
  useEffect(()=>{
    setMarkdown("Type or Paste some Markdown here...")
  }, [])
  
  const handleCopyHtml = () => {
    const htmlString = document.getElementById("markdown-output")?.innerHTML || "";
    navigator.clipboard.writeText(htmlString);
  };

  return (
    <Card className={`${styles.card} card`}>
      <Card.Body>
        {/* Markdown Input */}
        <textarea
          className={styles.textarea}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type Markdown here..."
        />

        <Button className="button" onClick={handleCopyHtml}>Copy HTML</Button>

        {/* Markdown Output as HTML */}
        <div className={styles.outputContainer}>
          <h3>Converted HTML:</h3>
          <Editor
            height="200px"
            defaultLanguage="html"
            value={document.getElementById("markdown-output")?.innerHTML || ""}
            options={{ theme: "vs-dark", readOnly: true }}
          />
        </div>

        {/* Hidden ReactMarkdown Component to extract HTML */}
        <div id="markdown-output" style={{ display: "none" }}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MarkdownToHtmlConverter;
