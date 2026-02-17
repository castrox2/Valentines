import React, { useState } from 'react';
import { NO_LABEL_STEP } from '../config/appConfig';
import './ValentinePage.css';

interface ValentinePageProps {
  onYes: () => void;
  maxNoAttempts: number;
  noLabels: string[];
}

const ValentinePage: React.FC<ValentinePageProps> = ({ onYes, maxNoAttempts, noLabels }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);

  const handleNoHover = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoButtonPos({ x: randomX, y: randomY });
    setNoAttempts((state) => Math.min(state + 1, maxNoAttempts));
  };

  // Labels are selected by attempt buckets (0, 3, 6, ...) up to maxNoAttempts.
  const getNoLabel = () => {
    const safeAttempts = Math.min(noAttempts, maxNoAttempts);
    const labelIndex = Math.min(
      Math.floor(safeAttempts / NO_LABEL_STEP),
      Math.max(0, noLabels.length - 1)
    );

    return noLabels[labelIndex] ?? noLabels[noLabels.length - 1] ?? 'No';
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
            {'\u2764\uFE0F'}
          </div>
        ))}
      </div>

      <div className="content-wrapper">
        <div className={`heart-decoration ${yesClicked ? 'beat' : ''}`}>{'\uD83D\uDC95'}</div>

        <h1 className="main-question">Will You Be My Valentine?</h1>

        <div className="button-container">
          <button className={`btn btn-yes ${yesClicked ? 'clicked' : ''}`} onClick={handleYesClick}>
            {'Yes DUHH \uD83D\uDC98'}
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
