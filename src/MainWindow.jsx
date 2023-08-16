import './MainWindow.css';
import ImageCard from './ImageCard';
import { useState, useEffect } from 'react';
import ShuffleAnimation from './ShuffleAnimation.js';

const shuffleAnimation = ShuffleAnimation();

export default function MainWindow({ clickHistory, setClickedHistory, cards }) {
  const [cardOrder, setCardOrder] = useState([...Array(cards.length).keys()]);

  const handleClick = (e) => {
    // Update click history
    const clickedKey = e.currentTarget.dataset.key;

    if (clickHistory.includes(clickedKey)) {
      setClickedHistory([]);
      flashCards();
      return;
    } else {
      setClickedHistory([...clickHistory, clickedKey]);
    }

    // Create new order
    const originalCardOrder = [...cardOrder];
    const randomCardOrder = [];
    while (originalCardOrder.length > 0) {
      const randomNumber = Math.floor(Math.random() * originalCardOrder.length);
      const index = originalCardOrder.splice(randomNumber, 1);
      randomCardOrder.push(index[0]);
    }

    // start the shuffle animation, and execute the callback function when done
    shuffleAnimation.shuffleCards(() => {
      setCardOrder(randomCardOrder);

      // The setTimeout gives React a few extra milliseconds to reorder the cards
      // before they are shown to the player, otherwise not all cards will flip back together
      setTimeout(shuffleAnimation.flipCardsToFront, 50);
    });
  };

  function flashCards() {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.classList.add('reset-flash');
    cardContainer.addEventListener(
      'animationend',
      () => {
        cardContainer.classList.remove('reset-flash');
      },
      { once: true }
    );
  }

  const shuffledCards = cards.map((_, i, arr) => {
    return arr[cardOrder[i]];
  });

  return (
    <main>
      <div
        className="card-container"
        onTransitionEnd={shuffleAnimation.transitionHandler}
      >
        {shuffledCards.map((card, i) => (
          <ImageCard key={card.id} card={card} cardClickHandler={handleClick} />
        ))}
      </div>
    </main>
  );
}
