'use client'

import React, { useState, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import Upscaler from 'upscaler'
import x2Model from '@upscalerjs/esrgan-slim/2x'
import x4Model from '@upscalerjs/esrgan-slim/4x'
import styles from './ImageUpscaler.module.css'

export default function ImageUpscaler() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [upscaledSrc, setUpscaledSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [scale, setScale] = useState(2)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setUpscaledSrc(null)
    }
    reader.readAsDataURL(file)
  }

  const handleUpscale = async () => {
    if (!imageSrc) return
    setLoading(true)

    const img = new Image()
    img.src = imageSrc
    img.crossOrigin = 'anonymous'

    img.onload = async () => {
      const tensor = tf.browser.fromPixels(img)
      const selectedModel = scale === 2 ? x2Model : x4Model

      const upscaler = new Upscaler({ model: selectedModel })

      const result = await upscaler.upscale(tensor, {
        output: 'base64',
        patchSize: 64,
        padding: 2,
      })

      setUpscaledSrc(result as string)
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!upscaledSrc) return
    const link = document.createElement('a')
    link.href = upscaledSrc
    link.download = `upscaled-${scale}x.png`
    link.click()
  } 

  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <button className={styles.button} onClick={() => fileInputRef.current?.click()}>
          Upload Image
        </button>
      </div>

      {imageSrc && (
        <>
          <div className={styles.preview}>
            <img src={imageSrc} alt="Original" className={styles.image} />
          </div>

          <div className={styles.controls}>
            <select
              id="scale"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className={styles.select}
            >
              <option value={2}>2x (faster)</option>
              <option value={4}>4x (slow, better quality)</option>
            </select>
            <button className={styles.button} onClick={handleUpscale} disabled={loading}>
              {loading ? 'Upscaling...' : `Upscale to ${scale}x`}
            </button>
          </div>
        </>
      )}

      {upscaledSrc && (
        <div className={styles.preview}>
          <img src={upscaledSrc} alt="Upscaled" className={styles.image} />
          <button className={styles.button} onClick={handleDownload}>
            Download Upscaled
          </button>
        </div>
      )}
    </div>
  )
}
