"use client"

import React, { useState} from "react";
import styles from "./Toolbox.module.css"; // Import CSS module
import { useRouter } from "next/navigation"
import { formatText } from "@/utils/Format";
import { Tool_T} from "@/interfaces";


export default function Toolbox({toolsData} : {toolsData:Tool_T[]}) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
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
      : (toolsData).filter((tool) => tool.type === selectedCategory);

  return (
    <div className={styles.toolboxContainer} id="toolbox">
      {/* Navigation Bar */}
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

      {/* Toolbox Grid */}
      <div className={styles.toolboxGrid}>
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div key={tool.id} className={styles.toolCard} onClick={()=>router.push(`/tool/${tool.type}/${tool.name}`)}>
              <h3>{formatText(tool.name)}</h3>
              <p className={styles.categoryTag}>{formatText(tool.type)}</p>
            </div>
          ))
        ) : (
          <p>No tools found in this category.</p>
        )}
      </div>
    </div>
  );
}
