"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import { Card, Button } from "react-bootstrap";
import MonacoEditor from "@monaco-editor/react";
import styles from "./MarkdownToHtml.module.css";

const MarkdownToHtmlConverter = () => {
  const [markdown, setMarkdown] = useState<string>("**Hello, world!** Type some Markdown here...");
  const [html, setHtml] = useState<string>("");

  // Function to safely convert Markdown to HTML
  const convertMarkdown = async (text: string) => {
    setMarkdown(text);

    // Ensure we handle both synchronous and asynchronous cases
    const compiledHtml = await Promise.resolve(marked.parse(text));
    setHtml(compiledHtml);
  };

  const copyToClipboard = async () => {
    if (html) {
      await navigator.clipboard.writeText(html);
    }
  };

  return (
    <Card className={`${styles.card} card`}>
      <Card.Body>
        <h2 className="tool-title">Markdown to HTML Converter</h2>
        <p className="tool-description">Convert your Markdown text into clean, formatted HTML instantly.</p>
        
        <textarea
          className={styles.textarea}
          value={markdown}
          onChange={(e) => convertMarkdown(e.target.value)}
          placeholder="Type Markdown here..."
        />
        
        <Button className={styles.button} onClick={copyToClipboard}>Copy HTML</Button>

        <div className={styles.outputContainer}>
          <h3>Converted HTML:</h3>
          <MonacoEditor 
            height="250px"
            language="html"
            value={html} // No TypeScript errors
            options={{ theme: "vs-dark", readOnly: true }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MarkdownToHtmlConverter;
