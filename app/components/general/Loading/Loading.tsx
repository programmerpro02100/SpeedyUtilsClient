"use client"

import React, { useState, useEffect } from "react";
import styles from "./Loading.module.css";

const messages: string[] = [
  "How was your day?",
  "Take a deep breath.",
  "Need a break?",
  "Hold on, thinking...",
  "Still with me?",
  "Almost there...",
  "Maybe grab a coffee?",
  "Processing your request...",
  "I'm on it!",
];

interface LoadingProps {
  text: string;
}

export default function Loading({ text }: LoadingProps) {
  const [subtext, setSubtext] = useState<string>(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setSubtext(randomMessage);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>{text}</p>
        <p className={styles.loadingSubtext}>{subtext}</p>
      </div>
    </div>
  );
}
