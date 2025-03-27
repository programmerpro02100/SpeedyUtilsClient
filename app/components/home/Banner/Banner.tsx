"use client"

import React, { useEffect, useRef } from "react";
import styles from "./Banner.module.css";

export default function Banner() {
  const handleExplore = () => {
    const toolbox = document.getElementById('toolbox');
    if (toolbox) {
      toolbox.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Get access to a{" "}
          <span className={styles.gradientText}>large treasure</span> of tools
        </h1>
        <p className={styles.subtext}>
          Unlock a collection of powerful resources designed to boost
          productivity and efficiency.
        </p>
        <button className={styles.ctaButton} onClick={handleExplore}>
          Explore Now
        </button>
      </div>
    </div>
  );
}
