import React, { useState } from "react";
import styles from "./CubicSolver.module.css";

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const CubicSolver: React.FC = () => {
  const [coefficients, setCoefficients] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
  });
  const [roots, setRoots] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoefficients({ ...coefficients, [e.target.name]: e.target.value });
  };

  const solveCubicEquation = () => {
    const { a, b, c, d } = coefficients;
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);
    const D = parseFloat(d);

    if (isNaN(A) || isNaN(B) || isNaN(C) || isNaN(D) || A === 0) {
      setError("Please enter valid coefficients (a ≠ 0).");
      setRoots([]);
      return;
    }

    setError("");

    // Convert cubic equation to depressed form using Cardano's method
    const p = (3 * A * C - B * B) / (3 * A * A);
    const q = (2 * B * B * B - 9 * A * B * C + 27 * A * A * D) / (27 * A * A * A);

    const discriminant = (q * q / 4) + (p * p * p / 27);
    const rootsArray: string[] = [];

    if (discriminant > 0) {
      // One real root and two complex conjugate roots
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const u = Math.cbrt(-q / 2 + sqrtDiscriminant);
      const v = Math.cbrt(-q / 2 - sqrtDiscriminant);
      const root1 = u + v - B / (3 * A);

      rootsArray.push(formatResult(root1));

      const realPart = -(u + v) / 2 - B / (3 * A);
      const imaginaryPart = Math.sqrt(3) * (u - v) / 2;

      rootsArray.push(`${formatResult(realPart)} + ${formatResult(imaginaryPart)}i`);
      rootsArray.push(`${formatResult(realPart)} - ${formatResult(imaginaryPart)}i`);
    } else if (discriminant === 0) {
      // All real roots, at least two are equal
      const u = Math.cbrt(-q / 2);
      const root1 = 2 * u - B / (3 * A);
      const root2 = -u - B / (3 * A);

      rootsArray.push(formatResult(root1));
      rootsArray.push(formatResult(root2));
      rootsArray.push(formatResult(root2));
    } else {
      // Three distinct real roots (Casus irreducibilis)
      const r = Math.sqrt(-p / 3);
      const theta = Math.acos(-q / (2 * r * r * r));
      const root1 = 2 * r * Math.cos(theta / 3) - B / (3 * A);
      const root2 = 2 * r * Math.cos((theta + 2 * Math.PI) / 3) - B / (3 * A);
      const root3 = 2 * r * Math.cos((theta + 4 * Math.PI) / 3) - B / (3 * A);

      rootsArray.push(formatResult(root1));
      rootsArray.push(formatResult(root2));
      rootsArray.push(formatResult(root3));
    }

    setRoots(rootsArray);
  };

  const formatResult = (value: number): string => {
    if (Number.isInteger(value)) return value.toString();
    return `${value.toFixed(4)}`;
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>Enter coefficients for the equation <strong>ax³ + bx² + cx + d = 0</strong></p>

      <div className={styles.inputGroup}>
        <input
          type="number"
          name="a"
          placeholder="a"
          value={coefficients.a}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="number"
          name="b"
          placeholder="b"
          value={coefficients.b}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="number"
          name="c"
          placeholder="c"
          value={coefficients.c}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="number"
          name="d"
          placeholder="d"
          value={coefficients.d}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>

      <button onClick={solveCubicEquation} className={styles.solveButton}>
        Solve Equation
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {roots.length > 0 && (
        <div className={styles.result}>
          <h3 className={styles.resultTitle}>Roots:</h3>
          {roots.map((root, index) => (
            <p key={index} className={styles.resultItem}>{root}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CubicSolver;
