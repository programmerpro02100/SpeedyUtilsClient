import { useState, useEffect } from 'react';
import styles from './FontPair.module.css';
import { Button } from 'react-bootstrap';

const GOOGLE_FONTS = [
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Playfair Display',
  'Raleway',
  'Merriweather',
  'Oswald',
  'Inter'
];

export default function FontPairTool() {
  const [headingFont, setHeadingFont] = useState('Roboto');
  const [bodyFont, setBodyFont] = useState('Open Sans');
  const [customText, setCustomText] = useState('The quick brown fox jumps over the lazy dog.');
  const [headingSize, setHeadingSize] = useState(28);
  const [bodySize, setBodySize] = useState(16);
  const [headingWeight, setHeadingWeight] = useState(700);
  const [bodyWeight, setBodyWeight] = useState(400);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, '+')}:wght@400;700&family=${bodyFont.replace(/ /g, '+')}:wght@300;400;700&display=swap`;
    document.head.appendChild(link);

    return () => {
        document.head.removeChild(link);
    }
  }, [headingFont, bodyFont]);

  const resetSettings = () => {
    setHeadingFont('Roboto');
    setBodyFont('Open Sans');
    setHeadingSize(28);
    setBodySize(16);
    setHeadingWeight(700);
    setBodyWeight(400);
    setCustomText('The quick brown fox jumps over the lazy dog.');
  };

  return (
    <div className={styles.container}>
      <h1 style={{ fontFamily: headingFont }} className={styles.heading}>Font Pairing Preview</h1>

      <div className={styles.controls}>
        <div>
          <label>Heading Font</label>
          <select value={headingFont} onChange={e => setHeadingFont(e.target.value)}>
            {GOOGLE_FONTS.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Body Font</label>
          <select value={bodyFont} onChange={e => setBodyFont(e.target.value)}>
            {GOOGLE_FONTS.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Heading Size ({headingSize}px)</label>
          <input type="range" min="18" max="60" value={headingSize} onChange={e => setHeadingSize(Number(e.target.value))} />
        </div>

        <div>
          <label>Body Size ({bodySize}px)</label>
          <input type="range" min="12" max="32" value={bodySize} onChange={e => setBodySize(Number(e.target.value))} />
        </div>

        <div>
          <label>Heading Weight ({headingWeight})</label>
          <input type="range" min="100" max="900" step="100" value={headingWeight} onChange={e => setHeadingWeight(Number(e.target.value))} />
        </div>

        <div>
          <label>Body Weight ({bodyWeight})</label>
          <input type="range" min="100" max="900" step="100" value={bodyWeight} onChange={e => setBodyWeight(Number(e.target.value))} />
        </div>
      </div>

      <textarea
        className={styles.textarea}
        value={customText}
        onChange={e => setCustomText(e.target.value)}
      />

      <div className={styles.preview}>
        <h2 style={{ fontFamily: headingFont, fontSize: `${headingSize}px`, fontWeight: headingWeight }}>Heading Preview</h2>
        <p style={{ fontFamily: bodyFont, fontSize: `${bodySize}px`, fontWeight: bodyWeight }}>{customText}</p>
      </div>

      <div className={styles.buttonRow}>
        <Button variant="secondary" className='mx-2' onClick={resetSettings}>Reset to Default</Button>
      </div>
    </div>
  );
}