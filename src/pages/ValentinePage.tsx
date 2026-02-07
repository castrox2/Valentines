import React, { useState, useRef } from 'react';
import './ValentinePage.css';

interface ValentinePageProps {
  onYes: () => void;
}

const ValentinePage: React.FC<ValentinePageProps> = ({ onYes }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [yesClicked, setYesClicked] = useState(false);

  const handleNoHover = () => {
    if (noButtonRef.current) {
      const randomX = Math.random() * 300 - 150;
      const randomY = Math.random() * 300 - 150;
      setNoButtonPos({ x: randomX, y: randomY });
    }
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
            ref={noButtonRef}
            className="btn btn-no"
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={{
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            }}
          >
            No 🤨
          </button>
        </div>

        <p className="hint-text">I didn't really have to ask but for formalities I GUESS </p>
      </div>
    </div>
  );
};

export default ValentinePage;
