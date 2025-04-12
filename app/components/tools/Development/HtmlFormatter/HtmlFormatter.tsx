'use client';

import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Editor from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';
import styles from './HtmlFormatter.module.css';

export default function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = async () => {
    try {
      const formatted = await prettier.format(input, {
        parser: 'html',
        plugins: [parserHtml],
      });
      setOutput(formatted);
      setCopied(false); // Reset copy state on new format
    } catch (err) {
      setOutput('Error formatting HTML.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <Container className={styles.formatterContainer}>
      <Row>
        <Col md={6}>
          <h5>Input HTML</h5>
          <div className={styles.editorWrapper}>
            <Editor
              height="300px"
              defaultLanguage="html"
              value={input}
              theme="vs-dark"
              onChange={(value) => setInput(value || '')}
            />
          </div>
        </Col>
        <Col md={6}>
          <h5>Formatted Output</h5>
          <div className={styles.editorWrapper}>
            <Editor
              height="300px"
              defaultLanguage="html"
              value={output}
              theme="vs-dark"
              options={{ readOnly: true }}
            />
          </div>
        </Col>
      </Row>
      <div className="text-center mt-4 d-flex flex-column align-items-center gap-3">
        <Button onClick={handleFormat} variant="primary">
          Format HTML
        </Button>
        <Button onClick={handleCopy} variant="secondary" disabled={!output}>
          {copied ? 'Copied!' : 'Copy Formatted HTML'}
        </Button>
      </div>
    </Container>
  );
}
