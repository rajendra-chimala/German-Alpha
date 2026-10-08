'use client';

import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Game from './components/Game';
import Results from './components/Results';
import styles from './page.module.css';

const PHASES = {
  LANDING: 'landing',
  GAME: 'game',
  RESULTS: 'results',
};

export default function Home() {
  const [phase, setPhase] = useState(PHASES.LANDING);
  const [gameResult, setGameResult] = useState(null);
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleStart = () => setPhase(PHASES.GAME);
  const handleGameEnd = (result) => {
    setGameResult(result);
    setPhase(PHASES.RESULTS);
  };
  const handleRestart = () => {
    setGameResult(null);
    setPhase(PHASES.LANDING);
  };

  return (
    <main className={styles.main}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <button className={styles.navLogo} onClick={handleRestart}>
          <div className={styles.navLogoMark}>
            <span className={styles.navLogoA}>A</span>
            <div className={styles.navFlagStripes}>
              <span className={styles.navStripeBlack}></span>
              <span className={styles.navStripeRed}></span>
              <span className={styles.navStripeGold}></span>
            </div>
          </div>
          <span className={styles.navLogoText}>Deutsch ABC</span>
        </button>
        {phase === PHASES.GAME && (
          <button className={styles.navQuit} onClick={handleRestart}>
            <i className="fa-solid fa-xmark"></i> Quit
          </button>
        )}
        {phase === PHASES.RESULTS && (
          <button className={styles.navPlay} onClick={() => setPhase(PHASES.GAME)}>
            <i className="fa-solid fa-rotate"></i> Play Again
          </button>
        )}
      </nav>

      {/* Content */}
      <div className={styles.content}>
        {phase === PHASES.LANDING && <Landing onStart={handleStart} />}
        {phase === PHASES.GAME && <Game onGameEnd={handleGameEnd} />}
        {phase === PHASES.RESULTS && gameResult && (
          <Results
            score={gameResult.score}
            results={gameResult.results}
            onRestart={handleRestart}
          />
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p><i className="fa-solid fa-flag"></i> Deutsch ABC · Learn German Alphabet · {year}</p>
      </footer>
    </main>
  );
}
