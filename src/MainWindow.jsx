import './MainWindow.css';
import ImageCard from './ImageCard';
import { useState } from 'react';
import ShuffleAnimation from './ShuffleAnimation.js';

const shuffleAnimation = ShuffleAnimation();

export default function MainWindow({ clickHistory, setClickedHistory, cards }) {
  const [cardOrder, setCardOrder] = useState([...Array(cards.length).keys()]);

  const shuffle = false;
  const handleClick = (e) => {
    const clickedKey = e.currentTarget.dataset.key;

    if (clickHistory.includes(clickedKey)) {
      setClickedHistory([]);
    } else {
      setClickedHistory([...clickHistory, clickedKey]);
    }

    createNewCardOrder();
    shuffleAnimation.flip();
  };

  const createNewCardOrder = () => {
    const originalCardOrder = [...cardOrder];
    const randomCardOrder = [];
    while (originalCardOrder.length > 0) {
      const randomNumber = Math.floor(Math.random() * originalCardOrder.length);
      const index = originalCardOrder.splice(randomNumber, 1);
      randomCardOrder.push(index[0]);
    }
    setCardOrder(randomCardOrder);
  };

  const shuffledCards = cards.map((_, i, arr) => {
    return arr[cardOrder[i]];
  });

  return (
    <main>
      <div className="card-container">
        {shuffledCards.map((card) => (
          <ImageCard key={card.id} card={card} cardClickHandler={handleClick} />
        ))}
      </div>
    </main>
  );
}
