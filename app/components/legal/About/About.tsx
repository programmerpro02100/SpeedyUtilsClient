"use client"

import React from "react";
import styles from "./About.module.css";
import { Container } from "react-bootstrap";

export default function About() {
  return (
    <section id="about" className={styles.aboutUs}>
      <Container>
        <h2 className={styles.title}>About SpeedyUtils</h2>
        <p className={styles.description}>
          SpeedyUtils is a comprehensive tool website designed to help users with a variety of needs, ranging from text writing and development to security and productivity. Our goal is to provide fast, reliable, and user-friendly tools that enhance efficiency and ease of use.
        </p>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>🚀 Our Mission</h3>
            <p>
              To build an all-in-one platform offering powerful and easy-to-use tools for developers, writers, and professionals.
            </p>
          </div>

          <div className={styles.card}>
            <h3>💡 Why Choose Us?</h3>
            <p>
              - A growing collection of free, high-quality tools <br />
              - No login required to use tools <br />
              - Dark theme support for a better experience
            </p>
          </div>

          <div className={styles.card}>
            <h3>🌍 Our Vision</h3>
            <p>
              To become the ultimate go-to platform for productivity and utility tools, empowering users worldwide.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
