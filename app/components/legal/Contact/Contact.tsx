"use client"

import React, { useState } from "react";
import { FaUser, FaPen, FaPaperPlane, FaList } from "react-icons/fa";
import styles from "./Contact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ApiFetch } from "@/utils/ApiFetch";
import { useRouter } from "next/navigation";

interface ErrorType {
  name?: string;
  type?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const user = useSelector((state: any) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors: ErrorType = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.type) newErrors.type = "Please select a category.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in first.");
      return;
    }

    if (validateForm()) {
      try {
        const response = await ApiFetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          alert("Failed to send message")
          throw new Error("Failed to send message");
        }

        console.log("Form submitted:", formData);
        setSubmitted(true);
        setFormData({ name: "", type: "", subject: "", message: "" });
      } catch (err) {
        alert("Failed to send message")
        console.error("Error sending message:", err);
      }
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.intro}>
          Have any questions, feedback, or issues? Let us know using the form below.
        </p>

        {submitted ? (
          <p className={styles.successMessage}>
            ✅ Your message has been sent! We will get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">
                <FaUser className={styles.icon} /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type">
                <FaList className={styles.icon} /> Category
              </label>
              <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="">-- Select a category --</option>
                <option value="General">General Inquiry</option>
                <option value="Issue">Report an Issue</option>
                <option value="Feedback">Feedback & Suggestions</option>
                <option value="Privacy">Privacy & Security Concern</option>
                <option value="Other">Other</option>
              </select>
              {errors.type && <span className={styles.error}>{errors.type}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">
                <FaPen className={styles.icon} /> Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
              />
              {errors.subject && <span className={styles.error}>{errors.subject}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">
                <FaPen className={styles.icon} /> Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              ></textarea>
              {errors.message && <span className={styles.error}>{errors.message}</span>}
            </div>

            <button type="submit" className={styles.submitBtn}>
              <FaPaperPlane className={styles.sendIcon} /> Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
