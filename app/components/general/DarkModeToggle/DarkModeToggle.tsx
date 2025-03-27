"use client";

import { useState, useEffect } from "react";
import styles from "./DarkModeToggle.module.css";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null); // Start with null to prevent SSR mismatch

  useEffect(() => {
    const getPreferredTheme = (): boolean => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) return storedTheme === "dark"; // User preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches; // System preference
    };

    setDarkMode(getPreferredTheme()); // Set theme after component mounts
  }, []);

  useEffect(() => {
    if (darkMode === null) return; // Prevent applying theme before state is set

    const applyTheme = (isDark: boolean) => {
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    applyTheme(darkMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [darkMode]);

  if (darkMode === null) return null; // Prevents hydration mismatch by avoiding initial rendering

  return (
    <div className={styles.toggleContainer} onClick={() => setDarkMode(!darkMode)}>
      <div className={`${styles.switch} ${darkMode ? styles.dark : styles.light}`}>
        <div className={styles.circle}>{darkMode ? <FaMoon /> : <FaSun />}</div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
