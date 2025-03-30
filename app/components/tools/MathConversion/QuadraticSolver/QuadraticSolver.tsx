import React, { useState } from "react";
import styles from "./QuadraticSolver.module.css";

const QuadraticSolver: React.FC = () => {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const solveQuadratic = () => {
    setError(null);
    setResult(null);

    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setError("Please enter valid numbers.");
      return;
    }

    if (aNum === 0) {
      setError("Coefficient 'a' cannot be zero.");
      return;
    }

    const discriminant = bNum * bNum - 4 * aNum * cNum;

    if (discriminant > 0) {
      const root1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
      const root2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
      setResult(`Roots: x = ${root1.toFixed(4)}, x = ${root2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const root = -bNum / (2 * aNum);
      setResult(`Single Root: x = ${root.toFixed(4)}`);
    } else {
      const realPart = (-bNum / (2 * aNum)).toFixed(4);
      const imagPart = (Math.sqrt(-discriminant) / (2 * aNum)).toFixed(4);
      setResult(`Complex Roots: x = ${realPart} + i${imagPart}, x = ${realPart} - i${imagPart}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          type="number"
          className={styles.inputField}
          placeholder="Enter a"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          type="number"
          className={styles.inputField}
          placeholder="Enter b"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
        <input
          type="number"
          className={styles.inputField}
          placeholder="Enter c"
          value={c}
          onChange={(e) => setC(e.target.value)}
        />
      </div>

      <button className={styles.solveButton} onClick={solveQuadratic}>
        Solve
      </button>

      {error && <p className={styles.errorText}>{error}</p>}
      {result && (
        <div className={styles.resultContainer}>
          <p className={styles.resultTitle}>Solution</p>
          <p className={styles.resultText}>{result}</p>
        </div>
      )}
    </div>
  );
};

export default QuadraticSolver;
