'use client';

import { useState, useEffect } from 'react';
import styles from './WordCounter.module.css';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

export default function WordCounterTool() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: '0 min'
  });

  useEffect(() => {
    const trimmed = text.trim();
    const words = trimmed.length ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;
    const readingTime = words > 0 ? `${Math.ceil(words / 200)} min` : '0 min';

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime
    });
  }, [text]);

  const handleClear = () => setText('');

  return (
    <Container className={styles.wrapper}>
      <Card className={`mb-4 p-3 ${styles.card}`}>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
              className={styles.textarea}
            />
          </Form.Group>
          <div className="text-end mt-3">
            <Button variant="outline-warning" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </Form>
      </Card>

      <Row className="gy-3">
        {[
          ['Words', stats.words],
          ['Characters', stats.characters],
          ['No-space Chars', stats.charactersNoSpaces],
          ['Sentences', stats.sentences],
          ['Paragraphs', stats.paragraphs],
          ['Reading Time', stats.readingTime]
        ].map(([label, value], i) => (
          <Col key={i} xs={12} sm={6} md={4}>
            <Card className={`p-3 ${styles.statCard}`}>
              <strong>{label}:</strong> {value}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
