"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Toolbox.module.css";
import { formatText } from "@/utils/Format";
import LoadingPage from "@/app/other/LoadingPage";
import { ToolType } from "@/interfaces";
import Link from "next/link";

export default function Toolbox({ toolsData }: { toolsData: ToolType[] }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false); // Loading state

  const categories = [
    "All",
    "text-writing",
    "development",
    "seo-web",
    "image-graphics",
    "math-conversion",
    "security-encryption",
    "productivity",
  ];

  const filteredTools =
    selectedCategory === "All"
      ? toolsData
      : toolsData.filter((tool) => tool.type === selectedCategory);
  
  if(loading) return  <LoadingPage loadingText="Fetching tool from server..." />

  return (
    <div className={styles.toolboxContainer} id="toolbox">
      <nav className={styles.navbar}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.navButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {formatText(category)}
          </button>
        ))}
      </nav>

        <div className={styles.toolboxGrid}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool._id}
                className={styles.toolCard}
                href={`/tool/${tool.type}/${tool.name}`}
                // onClick={() => handleToolClick(tool.type, tool.name)}
              >
                <h3>{formatText(tool.name)}</h3>
                <p className={styles.categoryTag}>{formatText(tool.type)}</p>
              </Link>
            ))
          ) : (
            <p>No tools found in this category.</p>
          )}
        </div>
    </div>
  );
}
