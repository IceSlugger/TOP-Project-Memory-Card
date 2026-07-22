function CardItem({ hero, handleCardClick }) {
  return (
    <div className="card" onClick={() => handleCardClick(hero.id)}>
      <img src={hero.image} alt={hero.name} />
      <h3>{hero.name}</h3>
    </div>
  );
}

export default CardItem;