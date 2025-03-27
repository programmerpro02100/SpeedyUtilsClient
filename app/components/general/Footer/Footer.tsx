"use client"

import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleLinks = (section: string) => {
    if (window.location.pathname !== "/legal") {
      router.push("/legal"); 
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo or Brand Name */}
        <h2 className={styles.logo}>SpeedyUtils</h2>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li><Link href="/legal#about">About Us</Link></li>
          <li><Link href="/legal#contact">Contact</Link></li>
          <li><Link href="/legal#terms">Terms</Link></li>
          <li><Link href="/legal#privacy">Privacy</Link></li>
          <li><Link href="/legal#disclaimer">Disclaimer</Link></li>
        </ul>

        {/* Social Media Links */}
        <div className={styles.socialIcons}>
          <Link href="#" className={styles.icon}><FaFacebook /></Link>
          <Link href="#" className={styles.icon}><FaTwitter /></Link>
          <Link href="#" className={styles.icon}><FaInstagram /></Link>
          <Link href="#" className={styles.icon}><FaLinkedin /></Link>
        </div>

        {/* Copyright */}
        <p className={styles.copyright}>
          © {new Date().getFullYear()} SpeedyUtils. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
