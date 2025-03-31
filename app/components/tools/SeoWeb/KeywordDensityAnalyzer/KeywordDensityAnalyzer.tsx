"use client";

import { useState } from "react";
import styles from "./KeywordDensityAnalyzer.module.css";
import { Container, Form, Button, Table, Alert } from "react-bootstrap";

const stopWords = new Set(["the", "is", "in", "and", "to", "a", "of", "for", "on", "with", "as", "by", "an", "at", "from"]);

const calculateDensity = (text: string) => {
    const words = text.toLowerCase().match(/\b[\w'-]+\b/g) || [];
    const filteredWords = words.filter(word => !stopWords.has(word));
    const totalWords = filteredWords.length;
    const wordCount: Record<string, number> = {};

    filteredWords.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
    return { sortedWords, totalWords };
};

const calculateReadability = (text: string) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const syllables = text.match(/[aeiouy]{1,2}/g)?.length || 0;
    
    if (words === 0 || sentences === 0) return "N/A";
    const readability = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    return readability.toFixed(2);
};

export default function KeywordDensityAnalyzer() {
    const [text, setText] = useState("");
    const [analysis, setAnalysis] = useState<{ sortedWords: [string, number][], totalWords: number } | null>(null);
    const [readability, setReadability] = useState("N/A");
    
    const analyzeText = () => {
        setAnalysis(calculateDensity(text));
        setReadability(calculateReadability(text));
    };

    return (
        <Container className={styles.analyzerContainer}>
            <h2 className={styles.heading}>Keyword Density Analyzer</h2>
            <Form.Group>
                <Form.Control as="textarea" rows={5} value={text} onChange={e => setText(e.target.value)} placeholder="Enter your text here..." className={styles.textarea} />
            </Form.Group>
            <Button onClick={analyzeText} className={styles.analyzeBtn}>Analyze</Button>
            {analysis && (
                <div className={styles.resultContainer}>
                    <Alert variant="info">Total Words: {analysis.totalWords}</Alert>
                    <Alert variant="success">Readability Score: {readability}</Alert>
                    <h4>Keyword Frequency</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Keyword</th>
                                <th>Count</th>
                                <th>Density (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analysis.sortedWords.map(([word, count]) => (
                                <tr key={word}>
                                    <td>{word}</td>
                                    <td>{count}</td>
                                    <td>{((count / analysis.totalWords) * 100).toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}