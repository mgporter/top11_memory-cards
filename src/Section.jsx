import './Section.css';
import { useEffect, useState } from 'react';

export default function Section({
  clickHistory,
  cards,
  addCard,
  removeLastCard,
}) {
  const [highestScore, setHighestScore] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Update highest score
  useEffect(() => {
    if (clickHistory.length > highestScore)
      setHighestScore(clickHistory.length);
  }, [clickHistory]);

  useEffect(() => {
    // If the clickHistory just got reset, then reset the clock too
    if (clickHistory.length === 0) {
      setSeconds(0);
      flashItems();
    }

    // Start the timer
    const int = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [clickHistory]);

  function flashItems() {
    const scorePanel = document.querySelector('.score-panel');
    scorePanel.classList.add('reset-flash-scores');
    scorePanel.addEventListener(
      'animationend',
      () => {
        scorePanel.classList.remove('reset-flash-scores');
      },
      { once: true }
    );
  }

  return (
    <section className="score-panel">
      <h2 className="flashable">Current Score:</h2>
      <h3 className="flashable">{clickHistory.length}</h3>
      <h2>Highest Score:</h2>
      <h3>{highestScore}</h3>
      <h2>Card Count:</h2>
      <h3>{cards.length}</h3>
      <h3 className="timer flashable">
        {Math.floor(seconds / 60)}:{('0' + (seconds % 60)).slice(-2)}
      </h3>
      <div className="button-row">
        <button type="button" onClick={addCard}>
          Add random card
        </button>
        <button type="button" onClick={removeLastCard}>
          Remove last card
        </button>
      </div>
    </section>
  );
}
