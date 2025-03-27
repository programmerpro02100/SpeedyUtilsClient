"use client"

import React from "react";
import styles from "./FeedbackDisplay.module.css";

export default function FeedbackDisplay({ feedbacks }: {feedbacks: string[]}) {
  const ratingOptions = [
    "Very Helpful",
    "Helpful",
    "Neutral",
    "Confusing",
    "Not Helpful",
    "Not Worth the Time",
  ];

  const maxReviews = Math.max(feedbacks.length, 1);

  return (
    <div className={styles.feedbackContainer}>
      {ratingOptions.map((rating) => {
        const count = feedbacks.filter((feedback) => feedback === rating).length;
        const barWidth = (count / maxReviews) * 100;

        return (
          <div key={rating} className={styles.ratingRow}>
            <span className={styles.ratingLabel}>
              {rating} ({count})
            </span>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `${barWidth}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
