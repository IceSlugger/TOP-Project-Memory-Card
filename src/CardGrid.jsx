import CardItem from './CardItem';

function CardGrid({ cards, handleCardClick }) {
  return (
    <div className="card-grid">
      {cards.map((hero) => (
        <CardItem 
          key={hero.id} 
          hero={hero} 
          handleCardClick={handleCardClick} 
        />
      ))}
    </div>
  );
}

export default CardGrid;