import './ImageCard.css';

export default function ImageCard({ card, cardClickHandler }) {
  return (
    <div className="image-card" data-key={card.id} onClick={cardClickHandler}>
      <img src={card.imageUrl} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
}
