'use client';

import styles from './Results.module.css';

// Helper to render Font Awesome icons for tips
function TipIcon({ icon }) {
  const iconMap = {
    'font': <i className="fa-solid fa-font" />,
    'trophy': <i className="fa-solid fa-trophy" />,
    'circle-blue': <i className="fa-solid fa-circle" style={{ color: '#3b82f6' }} />,
    'circle-green': <i className="fa-solid fa-circle" style={{ color: '#22c55e' }} />,
    'circle-yellow': <i className="fa-solid fa-circle" style={{ color: '#eab308' }} />,
    'circle-purple': <i className="fa-solid fa-circle" style={{ color: '#a855f7' }} />,
    'thumbtack': <i className="fa-solid fa-thumbtack" />,
  };
  return iconMap[icon] || <i className="fa-solid fa-circle-info" />;
}

const TIPS = {
  vowel: "Practice German vowels daily. Pay attention to long vs. short vowel sounds.",
  umlaut: "Umlauts (Ä, Ö, Ü) are unique to German. Try singing them to memorize the mouth positions.",
  consonant: "German consonants follow strict rules. Focus on letters that differ from English (J, V, W, Z).",
  special: "The ß (Eszett) is a unique German character. It always sounds like 'ss'.",
};

function getLetterTips(wrongLetters) {
  const tips = [];
  const categories = new Set(wrongLetters.map(l => l.question.category));

  // Category-based tips
  categories.forEach(cat => {
    if (TIPS[cat]) {
      tips.push({ type: 'category', text: TIPS[cat], icon: getCategoryIcon(cat) });
    }
  });

  // Specific letter tips for wrong answers
  wrongLetters.slice(0, 3).forEach(({ question, selected }) => {
    tips.push({
      type: 'letter',
      icon: 'font',
      text: `"${question.letter}" (${question.name}) — ${question.pronunciation} Example: "${question.example}" means "${question.english}".`,
    });
  });

  if (tips.length === 0) {
    tips.push({
      type: 'general',
      icon: 'trophy',
      text: 'Perfect score! Keep practicing to improve your German pronunciation speed.',
    });
  }

  return tips;
}

function getCategoryIcon(cat) {
  return { vowel: 'circle-blue', consonant: 'circle-green', umlaut: 'circle-yellow', special: 'circle-purple' }[cat] || 'thumbtack';
}

function getGrade(score) {
  if (score === 20) return { grade: 'S', label: 'Perfekt!', color: '#7c3aed', bg: '#f5f3ff' };
  if (score >= 18) return { grade: 'A+', label: 'Ausgezeichnet!', color: '#059669', bg: '#ecfdf5' };
  if (score >= 16) return { grade: 'A', label: 'Sehr gut!', color: '#16a34a', bg: '#f0fdf4' };
  if (score >= 14) return { grade: 'B', label: 'Gut!', color: '#2563eb', bg: '#eff6ff' };
  if (score >= 12) return { grade: 'C', label: 'Befriedigend', color: '#d97706', bg: '#fffbeb' };
  if (score >= 10) return { grade: 'D', label: 'Ausreichend', color: '#ea580c', bg: '#fff7ed' };
  return { grade: 'F', label: 'Übung macht den Meister!', color: '#dc2626', bg: '#fef2f2' };
}

export default function Results({ score, results, onRestart }) {
  const wrongLetters = results.filter(r => !r.isCorrect);
  const correctLetters = results.filter(r => r.isCorrect);
  const tips = getLetterTips(wrongLetters);
  const grade = getGrade(score);
  const avgTime = results.reduce((sum, r) => sum + r.timeTaken, 0) / results.length;

  return (
    <div className={styles.resultsContainer}>
      {/* Score Hero */}
      <div className={styles.scoreHero} style={{ background: grade.bg, borderColor: grade.color + '40' }}>
        <div className={styles.gradeCircle} style={{ background: grade.color }}>
          {grade.grade}
        </div>
        <div className={styles.heroText}>
          <h2 className={styles.heroLabel} style={{ color: grade.color }}>{grade.label}</h2>
          <p className={styles.heroScore}>
            <span className={styles.scoreNum}>{score}</span>
            <span className={styles.scoreMax}> / 20</span>
          </p>
          <p className={styles.heroSubtext}>
            {Math.round((score / 20) * 100)}% correct · Avg. {avgTime.toFixed(1)}s per question
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}><i className="fa-solid fa-circle-check"></i></span>
          <span className={styles.statNum}>{correctLetters.length}</span>
          <span className={styles.statLabel}>Correct</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}><i className="fa-solid fa-circle-xmark"></i></span>
          <span className={styles.statNum}>{wrongLetters.length}</span>
          <span className={styles.statLabel}>Wrong</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}><i className="fa-solid fa-bolt"></i></span>
          <span className={styles.statNum}>{avgTime.toFixed(0)}s</span>
          <span className={styles.statLabel}>Avg. Speed</span>
        </div>
      </div>

      {/* Answer Review */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}><i className="fa-solid fa-clipboard-list"></i> Question Review</h3>
        <div className={styles.reviewGrid}>
          {results.map((r, i) => (
            <div
              key={i}
              className={`${styles.reviewItem} ${r.isCorrect ? styles.reviewCorrect : styles.reviewWrong}`}
              title={`${r.question.letter} (${r.question.name}) — ${r.question.example}`}
            >
              <span className={styles.reviewLetter}>{r.question.letter}</span>
              <span className={styles.reviewMark}>{r.isCorrect ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}><i className="fa-solid fa-lightbulb"></i> Tips for Improvement</h3>
        <div className={styles.tipsContainer}>
          {tips.map((tip, i) => (
            <div key={i} className={styles.tipCard}>
              <span className={styles.tipIcon}><TipIcon icon={tip.icon} color={tip.color} /></span>
              <p className={styles.tipText}>{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wrong Letters Detail */}
      {wrongLetters.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}><i className="fa-solid fa-repeat"></i> Letters to Practice</h3>
          <div className={styles.practiceList}>
            {wrongLetters.map((r, i) => (
              <div key={i} className={styles.practiceCard}>
                <div className={styles.practiceHeader}>
                  <span className={styles.practiceLetter}>{r.question.letter}</span>
                  <div className={styles.practiceInfo}>
                    <span className={styles.practiceName}>"{r.question.name}"</span>
                    <span className={styles.practiceExample}>
                      {r.question.example} = {r.question.english}
                    </span>
                  </div>
                  <span className={styles.practiceIPA}>{r.question.ipa}</span>
                </div>
                <p className={styles.practiceTip}>{r.question.pronunciation}</p>
                {r.selected && (
                  <p className={styles.practiceYourAnswer}>
                    Your answer: <strong>{r.selected.letter}</strong> ({r.selected.name})
                  </p>
                )}
                {!r.selected && (
                  <p className={styles.practiceYourAnswer}><i className="fa-solid fa-clock"></i> Time expired</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.restartBtn} onClick={onRestart}>
          <span><i className="fa-solid fa-rotate"></i></span> Play Again
        </button>
      </div>
    </div>
  );
}
