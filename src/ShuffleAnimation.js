export default function ShuffleAnimation() {
  function flip() {
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach((card) => {
      card.classList.add('flip');
    });
  }

  return {
    flip,
  };
}
