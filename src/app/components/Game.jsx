'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateQuestions, generateOptions, germanAlphabet } from '../data/alphabet';
import styles from './Game.module.css';

const QUESTION_TIME = 20; // seconds per question

export default function Game({ onGameEnd }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [results, setResults] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [timerWarning, setTimerWarning] = useState(false);

  useEffect(() => {
    const qs = generateQuestions();
    setQuestions(qs);
    setOptions(generateOptions(qs[0], germanAlphabet));
  }, []);

  useEffect(() => {
    if (!questions.length) return;
    setOptions(generateOptions(questions[currentIndex], germanAlphabet));
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(QUESTION_TIME);
    setIsTimerRunning(true);
    setTimerWarning(false);
  }, [currentIndex, questions]);

  useEffect(() => {
    if (!isTimerRunning || isAnswered) return;

    if (timeLeft <= 5) setTimerWarning(true);
    else setTimerWarning(false);

    if (timeLeft === 0) {
      handleAnswer(null); // time's up - no answer
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isTimerRunning, isAnswered]);

  const handleAnswer = useCallback(
    (selected) => {
      if (isAnswered) return;
      setIsTimerRunning(false);
      setIsAnswered(true);
      setSelectedAnswer(selected);

      const current = questions[currentIndex];
      const isCorrect = selected && selected.letter === current.letter;
      if (isCorrect) setScore((s) => s + 1);

      setResults((r) => [
        ...r,
        {
          question: current,
          selected,
          isCorrect,
          timeTaken: QUESTION_TIME - timeLeft,
        },
      ]);

      // Auto-advance after 1.8s
      setTimeout(() => {
        if (currentIndex + 1 >= 20) {
          onGameEnd({
            score: isCorrect ? score + 1 : score,
            results: [
              ...results,
              {
                question: current,
                selected,
                isCorrect,
                timeTaken: QUESTION_TIME - timeLeft,
              },
            ],
          });
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1800);
    },
    [isAnswered, questions, currentIndex, score, results, timeLeft, onGameEnd]
  );

  if (!questions.length) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading game...</p>
      </div>
    );
  }

  const current = questions[currentIndex];
  const progress = ((currentIndex) / 20) * 100;
  const timerProgress = (timeLeft / QUESTION_TIME) * 100;

  return (
    <div className={styles.gameContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.questionCounter}>
          <span className={styles.counterCurrent}>{currentIndex + 1}</span>
          <span className={styles.counterTotal}> / 20</span>
        </div>
        <div className={styles.scoreDisplay}>
          <span className={styles.scoreIcon}><i className="fa-solid fa-star"></i></span>
          <span className={styles.scoreValue}>{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timer */}
      <div className={styles.timerSection}>
        <div className={styles.timerCircle}>
          <svg viewBox="0 0 80 80" className={styles.timerSvg}>
            <circle cx="40" cy="40" r="35" className={styles.timerTrack} />
            <circle
              cx="40"
              cy="40"
              r="35"
              className={`${styles.timerRing} ${timerWarning ? styles.timerWarningRing : ''}`}
              strokeDasharray={`${2 * Math.PI * 35}`}
              strokeDashoffset={`${2 * Math.PI * 35 * (1 - timerProgress / 100)}`}
            />
          </svg>
          <span className={`${styles.timerText} ${timerWarning ? styles.timerWarningText : ''}`}>
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className={styles.questionCard}>
        <p className={styles.questionLabel}>What is this German letter called?</p>
        <div className={styles.letterDisplay}>
          <span className={styles.letterBig}>{current.letter}</span>
        </div>
        <div className={styles.letterMeta}>
          <span className={styles.categoryBadge}>{current.category}</span>
        </div>
      </div>

      {/* Options */}
      <div className={styles.optionsGrid}>
        {options.map((option, idx) => {
          let optionClass = styles.optionBtn;
          if (isAnswered) {
            if (option.letter === current.letter) {
              optionClass = `${styles.optionBtn} ${styles.optionCorrect}`;
            } else if (selectedAnswer && option.letter === selectedAnswer.letter) {
              optionClass = `${styles.optionBtn} ${styles.optionWrong}`;
            } else {
              optionClass = `${styles.optionBtn} ${styles.optionDimmed}`;
            }
          }
          return (
            <button
              key={option.letter}
              className={optionClass}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
            >
              <span className={styles.optionName}>{option.name}</span>
              <span className={styles.optionNepali}>{option.nepali}</span>
              {isAnswered && option.letter === current.letter && (
                <span className={styles.optionCheck}><i className="fa-solid fa-check"></i></span>
              )}
              {isAnswered && selectedAnswer && option.letter === selectedAnswer.letter && option.letter !== current.letter && (
                <span className={styles.optionX}><i className="fa-solid fa-xmark"></i></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className={`${styles.feedback} ${selectedAnswer?.letter === current.letter ? styles.feedbackCorrect : styles.feedbackWrong}`}>
          {selectedAnswer?.letter === current.letter ? (
            <div>
              <span className={styles.feedbackIcon}><i className="fa-solid fa-circle-check"></i></span>
              <span>Ausgezeichnet! <strong>{current.letter}</strong> is called <strong>"{current.name}"</strong></span>
            </div>
          ) : (
            <div>
              <span className={styles.feedbackIcon}>{selectedAnswer ? <i className="fa-solid fa-face-sad-tear"></i> : <i className="fa-solid fa-clock"></i>}</span>
              <span>{selectedAnswer ? 'Not quite!' : "Time's up!"} It's <strong>"{current.name}"</strong> — Example: <strong>{current.example}</strong> ({current.english})</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
