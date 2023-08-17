import './MainWindow.css';
import ImageCard from './ImageCard';
import { useState, useEffect } from 'react';
import ShuffleAnimation from './ShuffleAnimation.js';
import CreatorLink from './creatorlink';

const shuffleAnimation = ShuffleAnimation();

export default function MainWindow({
  clickHistory,
  setClickedHistory,
  cards,
  cardOrder,
  setCardOrder,
}) {
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

  // When a card is added, we need to check to make sure its name does not
  // overflow the space on the card (the name-container)
  useEffect(() => {
    const nameContainers = document.querySelectorAll(
      '.image-card-name-container'
    );

    const startingSize = '1.2'; // in rems

    nameContainers.forEach((nameContainer) => {
      let size = startingSize;
      if (!isNameOverflown(nameContainer)) {
        return;
      } else {
        // If the name overflows the parent div, then we decrement its fontsize
        // and lineheight by 0.1 rems each time, until it doesn't overflow
        const nameElement = nameContainer.querySelector('p');
        do {
          nameElement.style.fontSize = `${(size -= 0.1)}rem`;
          nameElement.style.lineHeight = `${(size -= 0.1)}rem`;
        } while (isNameOverflown(nameContainer));
      }
    });
  }, [cards]);

  function isNameOverflown({ clientHeight, scrollHeight }) {
    return scrollHeight > clientHeight;
  }

  return (
    <main>
      <div
        className="card-container"
        onTransitionEnd={shuffleAnimation.transitionHandler}
      >
        {cards.map((_, i, arr) => (
          <ImageCard
            key={arr[cardOrder[i]].id}
            card={arr[cardOrder[i]]}
            cardClickHandler={handleClick}
          />
        ))}
      </div>
      <CreatorLink />
    </main>
  );
}
