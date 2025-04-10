'use client';

import React, { useState } from 'react';
import styles from './BinaryHexDecimalConverter.module.css';

export default function BinaryHexDecimalConverter() {
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^01]/g, '');
    setBinary(val);
    if (val === '') {
      setDecimal('');
      setHex('');
      return;
    }
    try {
      const dec = parseInt(val, 2);
      setDecimal(dec.toString());
      setHex(dec.toString(16).toUpperCase());
    } catch {
      setDecimal('');
      setHex('');
    }
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setDecimal(val);
    if (val === '') {
      setBinary('');
      setHex('');
      return;
    }
    try {
      const dec = parseInt(val, 10);
      setBinary(dec.toString(2));
      setHex(dec.toString(16).toUpperCase());
    } catch {
      setBinary('');
      setHex('');
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase();
    setHex(val);
    if (val === '') {
      setDecimal('');
      setBinary('');
      return;
    }
    try {
      const dec = parseInt(val, 16);
      setDecimal(dec.toString());
      setBinary(dec.toString(2));
    } catch {
      setDecimal('');
      setBinary('');
    }
  };

  return (
    <div className={styles.converter}>
      <div className={styles.inputGroup}>
        <label>Binary</label>
        <input type="text" value={binary} onChange={handleBinaryChange} />
      </div>
      <div className={styles.inputGroup}>
        <label>Decimal</label>
        <input type="text" value={decimal} onChange={handleDecimalChange} />
      </div>
      <div className={styles.inputGroup}>
        <label>Hexadecimal</label>
        <input type="text" value={hex} onChange={handleHexChange} />
      </div>
    </div>
  );
}
