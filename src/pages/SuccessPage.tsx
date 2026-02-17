import React from 'react';
import './SuccessPage.css';

interface SuccessPageProps {
  successTitle: string;
  successMessage: string;
  successPlaceholderText: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  successTitle,
  successMessage,
  successPlaceholderText,
}) => {
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
            {'\u2764\uFE0F'}
          </div>
        ))}
      </div>

      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <div className="success-content">
        <div className="celebration-hearts">{'\uD83C\uDF89\uD83D\uDC96\uD83C\uDF89'}</div>
        <h1 className="success-title">{successTitle}</h1>
        <p className="success-message">{successMessage}</p>
        <p className="placeholder-text">{successPlaceholderText}</p>

        <div className="heart-group">
          <span className="decorative-heart">{'\uD83D\uDC98'}</span>
          <span className="decorative-heart">{'\u2764\uFE0F'}</span>
          <span className="decorative-heart">{'\uD83D\uDC95'}</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
