export default function ShuffleAnimation() {
  let imageCards, imageCardInners, cardContainer, centerBoxRect, animationCycle;
  let callback;

  function transitionHandler(e) {
    // This function is called onTransitionEnd after every transition

    // Filter out the rotate transitionend events
    if (e.propertyName !== 'translate') return;

    // Only listen for events coming from the first element, which will not
    // have a e.target.previousSibling. We don't need the events from all
    // the elements
    if (animationCycle === 'moveToCenter' && !e.target.previousSibling) {
      shuffleAroundCenter();
    } else if (
      animationCycle === 'shuffleAroundCenter' &&
      !e.target.previousSibling
    ) {
      moveBackHome();
    } else if (animationCycle === 'moveBackHome' && !e.target.previousSibling) {
      animationCycle = '';

      // The callback is passed into the animation module at the beginning and
      // executed here, at the end of the animation loop.
      callback();
    }
  }

  function shuffleCards(cb) {
    callback = cb;

    cardContainer = document.querySelector('.card-container');
    imageCards = document.querySelectorAll('.image-card');
    imageCardInners = document.querySelectorAll('.image-card-inner');
    flipCardsToBack();
    updateCenterBox();
    moveToCenter(); // This starts the animation
  }

  function flipCardsToBack() {
    imageCardInners.forEach((card) => {
      card.classList.add('flip-to-back');
      card.style.rotate = 'y 180deg';
    });
  }

  function flipCardsToFront() {
    imageCardInners = document.querySelectorAll('.image-card-inner');
    imageCardInners.forEach((card) => {
      card.classList.remove('flip-to-back');
      card.style.rotate = 'y 0deg';
    });
  }

  function updateCenterBox() {
    const cardcontainerRect = cardContainer.getBoundingClientRect();
    const cardRect = document
      .querySelector('.image-card')
      .getBoundingClientRect();

    // The center box is a location in the center of the card container where cards
    // can be randomly sent to
    centerBoxRect = {
      left: cardcontainerRect.left + cardcontainerRect.width * 0.25,
      top: cardcontainerRect.top + cardcontainerRect.top * 0.25,
      width: cardcontainerRect.width * 0.5 - cardRect.width,
      height: cardRect.height,
    };
  }

  function moveToCenter() {
    animationCycle = 'moveToCenter';
    imageCards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect();
      const randomOffsetX = Math.random() * centerBoxRect.width;
      const randomOffsetY = Math.random() * centerBoxRect.height;

      card.style.translate = `${
        centerBoxRect.left - cardRect.left + randomOffsetX
      }px ${centerBoxRect.top - cardRect.top + randomOffsetY}px`;
    });
  }

  function shuffleAroundCenter() {
    animationCycle = 'shuffleAroundCenter';
    imageCards.forEach((card, i) => {
      const randomOffsetX = Math.random() * centerBoxRect.width;
      const randomOffsetY = Math.random() * centerBoxRect.height;

      card.style.translate = `${
        centerBoxRect.left - card.offsetLeft + randomOffsetX
      }px ${centerBoxRect.top - card.offsetTop + randomOffsetY}px`;
    });
  }

  function moveBackHome() {
    animationCycle = 'moveBackHome';
    imageCards.forEach((card, i) => {
      card.style.translate = '0px 0px';
    });
  }

  return {
    transitionHandler,
    shuffleCards,
    flipCardsToFront,
    flipCardsToBack,
  };
}
