'use client';

import { useState } from 'react';
import styles from './LumpSumCalculator.module.css';

const LumpSumCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(12);

  const r = rate / 100;
  const amount = principal * Math.pow(1 + r, years);
  const gain = amount - principal;

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>📈 Lump Sum Investment Calculator</h2>

      <div className={styles.formGroup}>
        <label>💰 Investment Amount (₹)</label>
        <input type="number" value={principal} min={0}
               onChange={(e) => setPrincipal(+e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label>📅 Investment Duration (Years)</label>
        <input type="number" value={years} min={1}
               onChange={(e) => setYears(+e.target.value)} />
      </div>

      <div className={styles.formGroup}>
        <label>📊 Expected Annual Return (%)</label>
        <input type="number" value={rate} min={0}
               onChange={(e) => setRate(+e.target.value)} />
      </div>

      <div className={styles.results}>
        <div className={styles.resultBox}>
          <h4>Total Invested</h4>
          <p>₹{principal.toLocaleString()}</p>
        </div>
        <div className={styles.resultBox}>
          <h4>Estimated Gain</h4>
          <p>₹{gain.toFixed(0).toLocaleString()}</p>
        </div>
        <div className={styles.resultBox}>
          <h4>Future Value</h4>
          <p>₹{amount.toFixed(0).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default LumpSumCalculator;
