function Header({ currentScore, bestScore }) {
  return (
    <header className="header">
      <h1>Marvel Memory Card</h1>
      <p className="description">
        Get points by clicking on a hero, but don't click on any hero more than once!
      </p>
      <div className="scoreboard">
        <p>Current Score: <span>{currentScore}</span></p>
        <p>Best Score: <span>{bestScore}</span></p>
      </div>
    </header>
  );
}

export default Header;