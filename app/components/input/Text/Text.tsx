import React from "react";
import { Form } from "react-bootstrap";
import styles from "./Text.module.css";

interface TextProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Text({ label, placeholder, value, onChange }: TextProps) {
  return (
    <div className={styles.textContainer}>
      {label && <Form.Label className={styles.label}>{label}</Form.Label>}
      <Form.Control
        type="text"
        className={`${styles.input} form-control`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
