import React, { useState } from 'react';
import './ValentinePage.css';

interface ValentinePageProps {
  onYes: () => void;
}

const ValentinePage: React.FC<ValentinePageProps> = ({ onYes }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);

  const handleNoHover = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoButtonPos({ x: randomX, y: randomY });
    setNoAttempts((s) => s + 1);
  };

  // Returns placeholder labels depending on how many times user attempted "No"
  const getNoLabel = () => {
    if (noAttempts >= 48) return 'kys.';
    if (noAttempts >= 45) return 'aii bruh last one fuck u';
    if (noAttempts >= 42) return 'ur at 42 fucking tries bro';
    if (noAttempts >= 39) return '...';
    if (noAttempts >= 36) return 'atp just tell me you dont want me bruh';
    if (noAttempts >= 33) return 'it aint even funny no more';
    if (noAttempts >= 30) return 'im like lowk running out of shit to say';
    if (noAttempts >= 27) return 'aii bro stop deadass';
    if (noAttempts >= 24) return 'nigger';
    if (noAttempts >= 21) return 'k whatever bye.';
    if (noAttempts >= 18) return 'at this point whyd i even ask';
    if (noAttempts >= 15) return 'aii fuck you.';
    if (noAttempts >= 12) return 'SO YOU WANT ME TO KMS???';
    if (noAttempts >= 9) return 'AII BRO WHY U TRYING SO HARD????';
    if (noAttempts >= 6) return 'bro deadas????';
    if (noAttempts >= 3) return 'tf you doing???';
    return 'No 🤨';
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setTimeout(onYes, 600);
  };

  return (
    <div className="valentine-container">
      <div className="floating-hearts">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="content-wrapper">
        <div className={`heart-decoration ${yesClicked ? 'beat' : ''}`}>
          💕
        </div>

        <h1 className="main-question">Will You Be My Valentine?</h1>

        <div className="button-container">
          <button
            className={`btn btn-yes ${yesClicked ? 'clicked' : ''}`}
            onClick={handleYesClick}
          >
            Yes DUHH💜
          </button>

          <button
            className="btn btn-no"
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={{
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            }}
          >
            {getNoLabel()}
          </button>
        </div>

        <p className="hint-text">I didn't really have to ask but for formalities I GUESS </p>
      </div>
    </div>
  );
};

export default ValentinePage;
