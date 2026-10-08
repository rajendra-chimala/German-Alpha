'use client';

import styles from './Landing.module.css';

export default function Landing({ onStart }) {
  return (
    <div className={styles.landingContainer}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logoMark}>
          <span className={styles.logoA}>A</span>
          <div className={styles.flagStripes}>
            <span className={styles.stripeBlack}></span>
            <span className={styles.stripeRed}></span>
            <span className={styles.stripeGold}></span>
          </div>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>Deutsch ABC</span>
          <span className={styles.logoSub}>German Alphabet Learning</span>
        </div>
      </div>

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Master the German Alphabet</h1>
        <p className={styles.heroDesc}>
          Test your knowledge of all 30 German letters including umlauts and ß.
          Answer 20 random questions with a 20-second timer each!
        </p>
      </div>

      {/* Features */}
      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}><i className="fa-solid fa-bullseye"></i></span>
          <div>
            <strong>20 Questions</strong>
            <p>Random selection every round</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}><i className="fa-solid fa-stopwatch"></i></span>
          <div>
            <strong>20s Timer</strong>
            <p>Answer before time runs out</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}><i className="fa-solid fa-chart-bar"></i></span>
          <div>
            <strong>Detailed Results</strong>
            <p>Tips to improve your score</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}><i className="fa-solid fa-font"></i></span>
          <div>
            <strong>All 30 Letters</strong>
            <p>A–Z plus Ä, Ö, Ü and ß</p>
          </div>
        </div>
      </div>

      {/* Alphabet Preview */}
      <div className={styles.alphabetPreview}>
        {['A','B','C','Ä','D','E','F','G','H','I','J','K','Ö','L','M','N','O','P','Q','R','S','T','U','Ü','V','W','X','Y','Z','ß'].map((l) => (
          <span key={l} className={styles.previewLetter}>{l}</span>
        ))}
      </div>

      {/* Start Button */}
      <button className={styles.startBtn} onClick={onStart}>
        <span className={styles.startBtnInner}>
          <span><i className="fa-solid fa-rocket"></i></span>
          <span>Start Quiz</span>
        </span>
      </button>
      <p className={styles.startHint}>30 letters · 20 questions · Beat the clock!</p>
    </div>
  );
}
