import { useEffect, useState, useRef } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      setIsPlaying(true);
      audio.muted = false; // unmute after playback starts
    };

    if (audio) {
      audio.loop = true;
      audio.muted = true; // mute initially to allow autoplay

      audio.addEventListener('play', handlePlay);

      return () => {
        audio.removeEventListener('play', handlePlay);
      };
    }
  }, []);

  const handleManualPlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        setIsPlaying(true);
        console.log('Music started manually');
      }).catch(error => {
        console.error('Error playing music manually:', error);
      });
    }
  };

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return{...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>The Guesser</h1>
      <button onClick={shuffleCards}>Start a New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <p>Created by: <a href="https://github.com/CoderRocha/" target="_blank" rel="noreferrer">Guilherme Rocha</a></p>
      <p>Music by: <a href="https://freesound.org/people/UNIVERSFIELD/" target="_blank" rel="noreferrer">UNIVERSFIELD</a></p>
      <audio ref={audioRef}>
        <source src="/./music/universfield__mysterious-music-box.ogg" type="audio/ogg" />
        Your browser does not support this audio element.
      </audio>
      {!isPlaying && (
        <button onClick={handleManualPlay}>Play Music</button>
      )}
    </div>
  );
}

export default App;