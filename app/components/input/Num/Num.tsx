"use client"

import React from "react";
import styles from "./Num.module.css"; // Import the CSS module
import { Container } from "react-bootstrap";

interface type{
  label: string,
  value: string | number
}

export default function Num({label, value}:type){
  return (
    <Container className={styles.numContainer}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </Container>
  );
};

