"use client";

import { useState, useEffect } from "react";
import styles from "./Feedback.module.css";
import FeedbackDisplay from "../FeedbackDisplay/FeedbackDisplay";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ApiFetch } from "@/utils/ApiFetch";
import { RootState } from "@/store/store"; // Assuming you have a RootState type

export default function Feedback({toolname}: {toolname: string}) {
  const user = useSelector((state: RootState) => state.user.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState("");
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState<string[]>([]);

  const ratingOptions = [
    { text: "Very Helpful", emoji: "🔥" },
    { text: "Helpful", emoji: "👍" },
    { text: "Neutral", emoji: "😐" },
    { text: "Confusing", emoji: "❓" },
    { text: "Not Helpful", emoji: "👎" },
    { text: "Not Worth the Time", emoji: "💀" },
  ];

  useEffect(() => {
    ApiFetch(`/feedback/display/${toolname}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch feedbacks");
        return res.json();
      })
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  const submitFeedback = async () => {
    if (!selectedRating) return alert("Please select a rating!");

    const feedbackData = { rating: selectedRating, comment };

    try {
      const response = await ApiFetch(`/feedback/submit/${toolname}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      setFeedbacks((prev) => [...prev, selectedRating]);
      setShowModal(false);
      setSelectedRating("");
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  const feedbackHandler = () => {
    if (!user) {
      alert("Please login to give feedback!");
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.feedbackContainer}>
        <button
          onClick={feedbackHandler}
          className={styles.feedbackBtn}
          id="feedback-button"
        >
          Give Feedback ⭐
        </button>

        {showModal && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <h3>How was your experience? 🧐</h3>
              <div className={styles.ratingOptions}>
                {ratingOptions.map(({ text, emoji }) => (
                  <button
                    key={text}
                    className={`${styles.ratingBtn} ${
                      selectedRating === text ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedRating(text)}
                  >
                    {emoji} {text}
                  </button>
                ))}
              </div>
              <textarea
                className={styles.textarea}
                placeholder="Add more details (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className={styles.modalActions}>
                <button onClick={submitFeedback} className={styles.submitBtn}>
                  Submit ✅
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.closeBtn}
                >
                  Close ❌
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Container>
        <FeedbackDisplay feedbacks={feedbacks} />
      </Container>
    </>
  );
}
