import './ImageCard.css';
import backgroundImg from './Moana-bg.webp';

export default function ImageCard({ card, cardClickHandler }) {
  return (
    <div className="image-card" data-key={card.id} onClick={cardClickHandler}>
      <div className="image-card-inner">
        <div className="image-card-front">
          <img src={card.imageUrl} alt={card.name} />
          <div className="image-card-name-container">
            <p>{card.name}</p>
          </div>
        </div>
        <div className="image-card-back"></div>
      </div>
    </div>
  );
}
