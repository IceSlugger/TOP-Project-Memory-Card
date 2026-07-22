import { useState, useEffect } from 'react';
import Header from './Header';
import CardGrid from './CardGrid';
import './App.css';

function App() {
  const [allHeroes, setAllHeroes] = useState([]); // Stores the master pool of ~500+ heroes
  const [cards, setCards] = useState([]);           // The current 12 heroes on screen
  const [clickedCardIds, setClickedCardIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isGameOver, setIsGameOver] = useState(false);

  // Helper to pick N random heroes from the master list
  const getRandomHeroes = (pool, count = 12) => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // 1. Fetch the master superhero list once on load
  useEffect(() => {
    const fetchAllHeroes = async () => {
      try {
        const response = await fetch(
          'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json'
        );
        const data = await response.json();

        // Map and clean up hero objects
        const cleanedHeroes = data.map((hero) => ({
          id: hero.id,
          name: hero.name,
          image: hero.images.md,
        }));

        setAllHeroes(cleanedHeroes);
        
        // Pick initial 12 random heroes
        setCards(getRandomHeroes(cleanedHeroes, 12));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch heroes:', error);
        setLoading(false);
      }
    };

    fetchAllHeroes();
  }, []);

  const resetGame = () => {
    setCurrentScore(0);
    setClickedCardIds([]);
    setIsGameOver(false);
    if (allHeroes.length > 0) {
      setCards(getRandomHeroes(allHeroes, 12));
    }
  };

  const handleCardClick = (id) => {
    if (isGameOver) return;

    if (clickedCardIds.includes(id)) {
      // GAME OVER: Clicked a card seen before
      setIsGameOver(true);
    } else {
      // SUCCESS POINT: New card clicked!
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedCardIds([...clickedCardIds, id]);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      // Pick a NEW set of 12 random cards from the entire pool
      setCards(getRandomHeroes(allHeroes, 12));
    }
  };

  return (
    <div className="app-container">
      <Header currentScore={currentScore} bestScore={bestScore} />

      <main className="main-content">
        {loading ? (
          <h2>Loading Superheroes...</h2>
        ) : (
          <CardGrid cards={cards} handleCardClick={handleCardClick} />
        )}
      </main>

      {/* GAME OVER MODAL */}
      {isGameOver && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>💥 Game Over!</h2>
            <p>You already clicked that hero!</p>
            <p className="modal-score">Final Score: {currentScore}</p>
            <button className="restart-btn" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;