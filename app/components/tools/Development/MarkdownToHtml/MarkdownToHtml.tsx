"use client";

import { useState } from "react";
import { marked } from "marked";
import { Card, Button } from "react-bootstrap";
import styles from "./MarkdownToHtml.module.css";

const MarkdownToHtmlConverter = () => {
    const [markdown, setMarkdown] = useState("**Hello, world!** Type some Markdown here...");
    const [html, setHtml] = useState("<p><strong>Hello, world!</strong> Type some Markdown here...</p>");

    const convertMarkdown = async (text: string) => {
        setMarkdown(text);

        const htmlOutput = await marked(text); // Ensure we resolve the promise
        setHtml(htmlOutput);
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


                <Button className="button" onClick={() => navigator.clipboard.writeText(html)}>Copy HTML</Button>

                <div className={styles.outputContainer}>
                    <h3>Converted HTML:</h3>
                    <div className={styles.output} dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default MarkdownToHtmlConverter;
