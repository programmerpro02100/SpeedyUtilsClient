'use client';

import React from 'react';
import Link from 'next/link';
import styles from './RecommendedTools.module.css';
import { formatText } from '@/utils/Format';
import { ToolType } from '@/interfaces';
import { Container } from 'react-bootstrap';

export default function RecommendedTools({recommendedTools}: {recommendedTools : ToolType[]}) {
  return (
    <Container className={styles.recommendationContainer}>
      <h2 className={styles.heading}>You Might Also Like</h2>
      <div className={styles.toolsGrid}>
        {recommendedTools.map((tool) => (
          <Link href={`/tool/${tool.name}`} key={tool.name} className={styles.toolCard}>
            <div>
              <h3 className={styles.toolName}>{formatText(tool.name)}</h3>
              <p className={styles.toolDescription}>{tool.metaDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
