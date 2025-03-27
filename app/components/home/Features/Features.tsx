"use client"

import React from "react";
import styles from "./Features.module.css"; // Import CSS module
import { FaRocket, FaShieldAlt, FaBolt, FaCheckCircle, FaInfinity, FaClock } from "react-icons/fa"; // Icons

const featuresData = [
  { id: 1, icon: <FaRocket />, title: "Lightning Fast", desc: "Our tools are optimized for speed, delivering results instantly." },
  { id: 2, icon: <FaShieldAlt />, title: "Secure & Private", desc: "No data tracking or storage—your privacy is our priority." },
  { id: 3, icon: <FaBolt />, title: "User-Friendly", desc: "Clean and intuitive interface, making tools easy to use for everyone." },
  { id: 4, icon: <FaCheckCircle />, title: "Accurate Results", desc: "Best-in-class algorithms ensure precision in every calculation." },
  { id: 5, icon: <FaInfinity />, title: "100% Free", desc: "All tools are completely free—no hidden costs, no sign-ups." },
  { id: 6, icon: <FaClock />, title: "Available Anytime", desc: "Access our tools 24/7 from any device, anytime, anywhere." },
];

export default function Features(){
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
};

