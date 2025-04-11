'use client';

import React, { useState } from 'react';
import styles from './TextEncryptionTool.module.css';
import CryptoJS from 'crypto-js';
import * as openpgp from 'openpgp';

const TextEncryptorTool = () => {
  const [mode, setMode] = useState<'aes' | 'rsa'>('aes');
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [outputText, setOutputText] = useState('');
  const [pgpKeys, setPgpKeys] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [rsaPassphrase, setRsaPassphrase] = useState('');

  const handleAesEncrypt = () => {
    if (!password || !inputText) return alert('Enter both password and text');
    const ciphertext = CryptoJS.AES.encrypt(inputText, password).toString();
    setOutputText(ciphertext);
  };

  const handleAesDecrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(inputText, password);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      if (!plaintext) throw new Error();
      setOutputText(plaintext);
    } catch {
      setOutputText('❌ Decryption failed. Check password or input.');
    }
  };

  const generateRsaKeyPair = async () => {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 2048,
      userIDs: [{ name: 'User', email: 'user@example.com' }],
      passphrase: rsaPassphrase || 'default',
    });
    setPgpKeys({ publicKey, privateKey });
  };

  const handleRsaEncrypt = async () => {
    if (!pgpKeys?.publicKey || !inputText) return alert('Generate keys first and enter text.');
    const publicKey = await openpgp.readKey({ armoredKey: pgpKeys.publicKey });
    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: inputText }),
      encryptionKeys: publicKey,
    });
    setOutputText(encrypted);
  };

  const handleRsaDecrypt = async () => {
    try {
      if (!pgpKeys?.privateKey || !inputText) return alert('Generate keys first and enter encrypted text.');
      const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: pgpKeys.privateKey }),
        passphrase: rsaPassphrase || 'default',
      });
      const message = await openpgp.readMessage({ armoredMessage: inputText });
      const { data: decrypted } = await openpgp.decrypt({ message, decryptionKeys: privateKey });
      setOutputText(decrypted as string);
    } catch {
      setOutputText('❌ RSA Decryption failed.');
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    alert('Copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button className={mode === 'aes' ? styles.active : ''} onClick={() => setMode('aes')}>AES-256</button>
        <button className={mode === 'rsa' ? styles.active : ''} onClick={() => setMode('rsa')}>RSA</button>
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Enter text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={5}
      />

      {mode === 'aes' && (
        <>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.actions}>
            <button onClick={handleAesEncrypt}>Encrypt</button>
            <button onClick={handleAesDecrypt}>Decrypt</button>
          </div>
        </>
      )}

      {mode === 'rsa' && (
        <>
          <input
            className={styles.input}
            type="password"
            placeholder="RSA Key Passphrase"
            value={rsaPassphrase}
            onChange={(e) => setRsaPassphrase(e.target.value)}
          />
          <div className={styles.actions}>
            <button onClick={generateRsaKeyPair}>Generate Keys</button>
            <button onClick={handleRsaEncrypt}>Encrypt</button>
            <button onClick={handleRsaDecrypt}>Decrypt</button>
          </div>

          {pgpKeys && (
            <div className={styles.keys}>
              <textarea
                readOnly
                className={styles.textarea}
                value={pgpKeys.publicKey}
                rows={4}
                placeholder="Public Key"
              />
              <textarea
                readOnly
                className={styles.textarea}
                value={pgpKeys.privateKey}
                rows={4}
                placeholder="Private Key"
              />
            </div>
          )}
        </>
      )}

      <textarea
        className={styles.textarea}
        placeholder="Result will appear here..."
        value={outputText}
        readOnly
        rows={5}
      />

      <button className={styles.copyBtn} onClick={handleCopy}>📋 Copy Output</button>
    </div>
  );
};

export default TextEncryptorTool;
