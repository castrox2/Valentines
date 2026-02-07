import React, { useState } from 'react';
import ValentinePage from './pages/ValentinePage';
import SuccessPage from './pages/SuccessPage';
import './styles.css';

const App: React.FC = () => {
  const [page, setPage] = useState<'valentine' | 'success'>('valentine');

  const handleYes = () => {
    setPage('success');
  };

  const handleReset = () => {
    setPage('valentine');
  };

  return (
    <div className="app">
      {page === 'valentine' && <ValentinePage onYes={handleYes} />}
      {page === 'success' && <SuccessPage onReset={handleReset} />}
    </div>
  );
};

export default App;
