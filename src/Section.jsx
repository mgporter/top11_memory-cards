import './Section.css';
import { useEffect, useState } from 'react';

export default function Section({ clickHistory, cards }) {
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    if (clickHistory.length > highestScore)
      setHighestScore(clickHistory.length);
  }, [clickHistory]);

  return (
    <section className="score-panel">
      <h2>Current Score:</h2>
      <h3>{clickHistory.length}</h3>
      <h2>Highest Score:</h2>
      <h3>{highestScore}</h3>
      <h2>Card Count:</h2>
      <h3>{cards.length}</h3>
    </section>
  );
}
