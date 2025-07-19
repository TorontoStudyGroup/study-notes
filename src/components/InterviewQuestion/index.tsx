import React, { useState } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';

interface InterviewQuestionProps {
  question: string;
  hint?: string;
  answer?: string;
  level?: 'mid' | 'senior';
}

export default function InterviewQuestion({ question, hint, answer, level }: InterviewQuestionProps) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <div className={styles.questionText}>
          <ReactMarkdown>{question.replace(/\\n/g, '\n')}</ReactMarkdown>
        </div>
        {level && (
          <div className={clsx(styles.levelBadge, level === 'senior' ? styles.seniorBadge : styles.midBadge)}>
            {level === 'senior' ? 'Senior' : 'Mid-Level'}
          </div>
        )}
      </div>
      
      <div className={styles.actionsContainer}>
        {hint && (
          <button
            className={clsx(styles.actionButton, styles.hintButton)}
            onClick={() => setShowHint(!showHint)}
            aria-expanded={showHint}
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        
        {answer && (
          <button
            className={clsx(styles.actionButton, styles.answerButton)}
            onClick={() => setShowAnswer(!showAnswer)}
            aria-expanded={showAnswer}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
        )}
      </div>

      {showHint && hint && (
        <div className={styles.expandedContent}>
          <div className={styles.contentLabel}>Hint:</div>
          <div className={styles.contentText}>
            <ReactMarkdown>{hint.replace(/\\n/g, '\n')}</ReactMarkdown>
          </div>
        </div>
      )}

      {showAnswer && answer && (
        <div className={styles.expandedContent}>
          <div className={styles.contentLabel}>Answer:</div>
          <div className={styles.contentText}>
            <ReactMarkdown>{answer.replace(/\\n/g, '\n')}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}