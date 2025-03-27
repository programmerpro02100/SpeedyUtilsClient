"use client"

import React from "react";
import styles from "./Terms.module.css";

export default function Terms() {
  return (
    <section id="terms" className={styles.terms}>
      <div className={styles.container}>
        <h2 className={styles.title}>Terms & Conditions</h2>
        <p className={styles.intro}>
          By using SpeedyUtils, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <div className={styles.section} id="use-of-services">
          <h3>🛠 Use of Services</h3>
          <p>
            SpeedyUtils provides various online tools. You may use them freely without an account. However, feedback submission requires login.
          </p>
        </div>

        <div className={styles.section} id="user-responsibilities">
          <h3>👤 User Responsibilities</h3>
          <p>
            You agree not to misuse our tools, attempt unauthorized access, or engage in any activity that may harm our platform.
          </p>
        </div>

        <div className={styles.section} id="limitation-of-liability">
          <h3>⚠️ Limitation of Liability</h3>
          <p>
            We do our best to provide accurate and useful tools, but we are not responsible for any errors, losses, or damages arising from their use.
          </p>
        </div>

        <div className={styles.section} id="adsense-policy">
          <h3>📢 Google AdSense Policy</h3>
          <p>
            Our site displays ads via Google AdSense. You must comply with Google's <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer">AdSense policies</a> while using our services.
          </p>
        </div>

        <div className={styles.section} id="account-termination">
          <h3>🚫 Account Termination</h3>
          <p>
            We reserve the right to block access to users who violate our policies or misuse our tools.
          </p>
        </div>

        <div className={styles.section} id="modifications">
          <h3>📌 Modifications to Terms</h3>
          <p>
            We may update these Terms & Conditions from time to time. Continued use of our site means acceptance of the new terms.
          </p>
        </div>
      </div>
    </section>
  );
}
