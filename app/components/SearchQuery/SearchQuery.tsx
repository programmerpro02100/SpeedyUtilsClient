"use client";

import { useEffect, useState } from "react";
import { ToolType } from "@/interfaces";
import styles from "./SearchQuery.module.css";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation"; // add this import

type Props = {
  tools: ToolType[];
  searchQuery: string
};

export default function SearchQuery({ tools, searchQuery }: Props) {
  const [results, setResults] = useState<ToolType[]>([]);
  const [userQuery, setUserQuery] = useState("");

  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };


  useEffect(() => {
    const query = searchQuery.toLowerCase().trim() || "";
    setUserQuery(query);

    if (!query) {
      // No query — show first 10 tools by default
      setResults(tools.slice(0, 10));
      return;
    }

    // Score tools by relevance
    const scoredTools = tools.map((tool) => {
      const combined = `${tool.name} ${tool.title} ${tool.description} ${tool.type}`.toLowerCase();
      let score = 0;

      if (combined.includes(query)) score += 3;
      if (tool.name.toLowerCase().includes(query)) score += 2;
      if (tool.title.toLowerCase().includes(query)) score += 2;
      if (tool.description.toLowerCase().includes(query)) score += 1;
      if (tool.type.toLowerCase().includes(query)) score += 1;

      return { tool, score };
    }, []);

    // Sort by score, then fallback to initial order if scores are equal
    const sorted = scoredTools
      .sort((a, b) => b.score - a.score)
      .map((item) => item.tool)
      .slice(0, 10);

    setResults(sorted);
  }, [tools]);

  return (
    <div className={styles.container}>
      <div className={`input-group mb-4 mx-auto my-2 w-100 ${styles.searchBox}`}>
        <input
          type="text"
          className="form-control"
          placeholder="Search tools..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button size="lg">
           search
        </Button>
      </div>

      {userQuery? 
          <h1 className={styles.heading}>Search Results for {userQuery}</h1>
          : null
      }

      {results.length === 0 ? (
        <p className={styles.noResults}>No tools found matching your search.</p>
      ) : (
        <ul className={styles.resultList}>
          {results.map((tool) => (
            <li key={tool.name} className={styles.resultItem}>
              <Link href={`/tool/${tool.type}/${tool.name}`} className={styles.resultLink}>
                <h3 className={styles.title}>{tool.title}</h3>
                <p className={styles.description}>{tool.metaDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
