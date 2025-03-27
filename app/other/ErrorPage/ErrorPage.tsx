"use client"

import errorCodes from "@/utils/ErrorCodes";
import styles from "./ErrorPage.module.css";
import { useSelector } from "react-redux";

export default function ErrorPage({code} :{code: number}){
  const errCode = useSelector((state: any)=>state.user.errorCode);
  const errorcode = code || errCode || 404;
  const errorObj = errorCodes.find(error=>error.code == errorcode);
  if(!errorObj) return null;

  return (
    <>
    <div className={styles.errorWrapper}>
    <div className={styles.errorContainer}>
      <h1 className={styles.errorCode}>{errorObj.code}</h1>
      <h2 className={styles.errorTitle}>{errorObj.title}</h2>
      <p className={styles.errorMessage}>{errorObj.message}</p>
      <button className={styles.retryButton} onClick={() => window.location.href="/"}>
        Return Home
      </button>
    </div>
    </div>
    </>
  );
};
