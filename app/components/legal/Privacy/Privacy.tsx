"use client"

import React from "react";
import styles from "./Privacy.module.css";

export default function Privacy() {
  return (
    <section id="privacy" className={styles.privacyPolicy}>
      <div className={styles.container}>
        <h2 className={styles.title}>Privacy Policy</h2>
        <p className={styles.intro}>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use SpeedyUtils.
        </p>

        <div className={styles.section} id="data-collection">
          <h3>📊 Data We Collect</h3>
          <p>
            We may collect limited personal data, such as login information (if you sign in) and feedback you provide. No tools require a login for use.
          </p>
        </div>

        <div className={styles.section} id="usage-data">
          <h3>🔍 How We Use Your Data</h3>
          <p>
            We use collected data to improve user experience, provide support, and enhance our tools. We do **not** sell your data to third parties.
          </p>
        </div>

        <div className={styles.section} id="adsense">
          <h3>📢 Google AdSense</h3>
          <p>
            We use Google AdSense to serve relevant ads. AdSense may use cookies to track user behavior for personalized advertising.
          </p>
          <p>
            <strong>Opt-Out:</strong> You can manage ad preferences via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
          </p>
        </div>

        <div className={styles.section} id="cookies">
          <h3>🍪 Cookies</h3>
          <p>
            We store login sessions in cookies and theme preferences in localStorage. You can disable cookies in your browser settings.
          </p>
        </div>

        <div className={styles.section} id="security">
          <h3>🔒 Data Security</h3>
          <p>
            We take reasonable security measures to protect your data. However, no online service is 100% secure.
          </p>
        </div>

        <div className={styles.section} id="changes">
          <h3>📌 Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy periodically. Users will be notified of major changes via a website notice.
          </p>
        </div>
      </div>
    </section>
  );
}
