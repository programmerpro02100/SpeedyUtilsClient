"use client"
import React from "react";
import styles from "./Disclaimer.module.css";

export default function Disclaimer() {
  return (
    <section id="disclaimer" className={styles.disclaimer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Disclaimer</h2>
        <p className={styles.intro}>
          The information and tools provided on SpeedyUtils are for informational and educational purposes only. By using our services, you acknowledge and accept this disclaimer.
        </p>

        <div className={styles.section} id="no-warranties">
          <h3>🔹 No Warranties</h3>
          <p>
            All tools and services on SpeedyUtils are provided "as is" without any guarantees of accuracy, reliability, or availability. We do not guarantee that our tools will meet your requirements or function without errors.
          </p>
        </div>

        <div className={styles.section} id="limitation-of-liability">
          <h3>⚠️ Limitation of Liability</h3>
          <p>
            We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our tools. Use them at your own risk.
          </p>
        </div>

        <div className={styles.section} id="third-party-links">
          <h3>🔗 Third-Party Links</h3>
          <p>
            SpeedyUtils may display advertisements or contain links to third-party websites (e.g., Google AdSense). We are not responsible for the content, security, or policies of these external sites.
          </p>
        </div>

        <div className={styles.section} id="changes-to-disclaimer">
          <h3>📌 Changes to This Disclaimer</h3>
          <p>
            We may modify this disclaimer at any time. Continued use of our site means acceptance of the updated disclaimer.
          </p>
        </div>
      </div>
    </section>
  );
}
