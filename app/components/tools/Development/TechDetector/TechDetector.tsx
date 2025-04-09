'use client'

import { useState } from 'react'
import styles from './TechDetector.module.css'
import { detectTechnologies } from './utils'
import { ApiFetch } from '@/utils/ApiFetch'

export default function TechDetectorPage() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ReturnType<typeof detectTechnologies> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true) 

    try {
      const res = await ApiFetch('/seo-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const { html, headers, error } = await res.json()
      if (error) throw new Error(error)

      const detected = detectTechnologies(html, headers)
      setResult(detected)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="url"
          placeholder="Enter website URL (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Detecting...' : 'Detect Technologies'}
        </button>
      </form>

      {error && <p className={styles.error}>⚠️ {error}</p>}

      {result && (
        <div className={styles.result}>
          <h2>Detected Technologies</h2>
          {Object.entries(result.categories).map(([category, items]) =>
            items.length > 0 ? (
              <div key={category} className={styles.category}>
                <h3>{category}</h3>
                <ul>
                  {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  )
}
