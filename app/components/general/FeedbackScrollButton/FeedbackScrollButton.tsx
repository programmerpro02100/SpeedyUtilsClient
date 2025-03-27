"use client"

import React from "react";
import styles from "./FeedbackScrollButton.module.css";

export default function FeedbackScrollButton(){
  const scrollToFeedback = () => {
    const feedbackSection = document.getElementById("feedback-button");
    if (feedbackSection) {
      feedbackSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.feedbackButton} onClick={scrollToFeedback}>
        💬 Share Your Feedback
      </button>
    </div>
  );
};