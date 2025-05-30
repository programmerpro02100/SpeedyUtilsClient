'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Stopwatch.module.css';

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the stopwatch when the component mounts
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps((prev) => [elapsed, ...prev]);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.card}>
        <h1 className={styles.time}>{formatTime(elapsed)}</h1>
        <div className={styles.buttons}>
          <button onClick={() => setIsRunning(!isRunning)} className={styles.button}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleLap} className={styles.button} disabled={!isRunning}>
            Lap
          </button>
          <button onClick={reset} className={`${styles.button} ${styles.reset}`}>
            Reset
          </button>
        </div>
        {laps.length > 0 && (
          <div className={styles.laps}>
            <h2>Laps</h2>
            <ul>
              {laps.map((lap, idx) => (
                <li key={idx}>
                  <span>Lap {laps.length - idx}</span>
                  <span>{formatTime(lap)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
