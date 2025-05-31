'use client';
import { useState } from 'react';
import styles from './CryptoTaxCalculator.module.css';

const CryptoTaxCalculator = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [shortTermGains, setShortTermGains] = useState('');
  const [longTermGains, setLongTermGains] = useState('');
  const [capitalLosses, setCapitalLosses] = useState('');
  const [carryoverLoss, setCarryoverLoss] = useState(false);
  const [shortTermRate, setShortTermRate] = useState('30');
  const [longTermRate, setLongTermRate] = useState('12.5');
  const [taxSummary, setTaxSummary] = useState<null | {
    taxableShortTerm: number;
    taxableLongTerm: number;
    totalTax: number;
  }>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const stg = parseFloat(shortTermGains) || 0;
    const ltg = parseFloat(longTermGains) || 0;
    const losses = parseFloat(capitalLosses) || 0;
    const stRate = parseFloat(shortTermRate) || 0;
    const ltRate = parseFloat(longTermRate) || 0;

    if (stg < 0 || ltg < 0 || losses < 0 || stRate < 0 || ltRate < 0) {
      setError('Please enter non-negative numbers only.');
      return;
    }

    let remainingLosses = losses;

    const applyLosses = (gains: number): [number, number] => {
      const taxable = Math.max(gains - remainingLosses, 0);
      remainingLosses = Math.max(remainingLosses - gains, 0);
      return [taxable, remainingLosses];
    };

    const [taxableST, _] = applyLosses(stg);
    const [taxableLT, __] = applyLosses(ltg);

    const totalTax = (taxableST * stRate) / 100 + (taxableLT * ltRate) / 100;

    setTaxSummary({
      taxableShortTerm: taxableST,
      taxableLongTerm: taxableLT,
      totalTax,
    });
  };

  const handleClear = () => {
    setShortTermGains('');
    setLongTermGains('');
    setCapitalLosses('');
    setCarryoverLoss(false);
    setShortTermRate('30');
    setLongTermRate('12.5');
    setTaxSummary(null);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label>Tax Year</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Short-Term Capital Gains ($)</label>
        <input
          type="number"
          value={shortTermGains}
          onChange={(e) => setShortTermGains(e.target.value)}
          placeholder="e.g., 10000"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Long-Term Capital Gains ($)</label>
        <input
          type="number"
          value={longTermGains}
          onChange={(e) => setLongTermGains(e.target.value)}
          placeholder="e.g., 5000"
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Total Capital Losses ($)</label>
        <input
          type="number"
          value={capitalLosses}
          onChange={(e) => setCapitalLosses(e.target.value)}
          placeholder="e.g., 3000"
        />
        <div className={styles.checkboxWrap}>
          <input
            type="checkbox"
            checked={carryoverLoss}
            onChange={() => setCarryoverLoss(!carryoverLoss)}
          />
          <label>Include carryover loss from previous year</label>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Short-Term Tax Rate (%)</label>
        <input
          type="number"
          value={shortTermRate}
          onChange={(e) => setShortTermRate(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Long-Term Tax Rate (%)</label>
        <input
          type="number"
          value={longTermRate}
          onChange={(e) => setLongTermRate(e.target.value)}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.buttonGroup}>
        <button className={styles.calculateButton} onClick={handleCalculate}>
          Calculate Tax
        </button>
        <button className={styles.clearButton} onClick={handleClear}>
          Clear
        </button>
      </div>

      {taxSummary && (
        <div className={styles.result}>
          <h4>Tax Summary ({year})</h4>
          <p>Taxable Short-Term Gains: ${taxSummary.taxableShortTerm.toFixed(2)}</p>
          <p>Taxable Long-Term Gains: ${taxSummary.taxableLongTerm.toFixed(2)}</p>
          <p><strong>Total Estimated Tax Owed: ${taxSummary.totalTax.toFixed(2)}</strong></p>
        </div>
      )}
    </div>
  );
};

export default CryptoTaxCalculator;
