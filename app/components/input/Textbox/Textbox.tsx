"use client"

import { ChangeEvent } from "react";
import styles from "./Textbox.module.css"; // Import CSS module
import { Container } from "react-bootstrap";

interface TextboxProps {
  placeholder?: string; // Added `?` to make it optional
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; // Correct event type
}

export default function Textbox({
  placeholder = "Type or paste your text here...",
  onChange,
}: TextboxProps) {
  return (
    <Container>
      <textarea
        className={styles.textArea}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Container>
  );
}
