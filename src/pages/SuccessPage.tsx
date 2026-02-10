import React from 'react';
import './SuccessPage.css';

const SuccessPage: React.FC = () => {
  return (
    <div className="success-container">
      <div className="floating-hearts">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <div className="success-content">
        <div className="celebration-hearts">🎉💖🎉</div>
        <h1 className="success-title">MMMMMMM TYPE SHIIIITTTTT 💕</h1>
        <p className="success-message">Glad you're back safe tho 💕</p>
        <p className="placeholder-text">
          Anyways I got my gifts lined up for valentines so thats why you didn't get shit but mogu mogu and stuff hehehehe so just wait, 
          I love you lil nigga💖💕💜❤️
        </p>

        <div className="heart-group">
          <span className="decorative-heart">💜</span>
          <span className="decorative-heart">❤️</span>
          <span className="decorative-heart">💕</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
