"use client";

import React from "react";
import styles from "./Features.module.css";
import {
  FaRocket,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaInfinity,
  FaClock,
  FaCogs,
  FaThumbsUp,
} from "react-icons/fa"; // Added two more icons

const featuresData = [
  {
    id: 1,
    icon: <FaRocket />,
    title: "Lightning Fast",
    desc: "Our tools are optimized for speed, delivering results instantly.",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Secure & Private",
    desc: "No data tracking or storage—your privacy is our priority.",
  },
  {
    id: 3,
    icon: <FaBolt />,
    title: "User-Friendly",
    desc: "Clean and intuitive interface, making tools easy to use for everyone.",
  },
  {
    id: 4,
    icon: <FaCheckCircle />,
    title: "Accurate Results",
    desc: "Best-in-class algorithms ensure precision in every calculation.",
  },
  {
    id: 5,
    icon: <FaInfinity />,
    title: "100% Free",
    desc: "All tools are completely free—no hidden costs, no sign-ups.",
  },
  {
    id: 6,
    icon: <FaClock />,
    title: "Available Anytime",
    desc: "Access our tools 24/7 from any device, anytime, anywhere.",
  },
  {
    id: 7,
    icon: <FaCogs />,
    title: "Constantly Evolving",
    desc: "We regularly add new tools and features based on user needs.",
  },
  {
    id: 8,
    icon: <FaThumbsUp />,
    title: "Trusted by Users",
    desc: "Thousands of users rely on our tools daily for their productivity.",
  },
];

export default function Features() {
  return (
    <section className={styles.featuresSection} id="features">
      <h2 className={styles.heading}>Why Choose Our Tools?</h2>
      <div className={styles.featuresGrid}>
        {featuresData.map((feature) => (
          <div key={feature.id} className={styles.featureCard}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
