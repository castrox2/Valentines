import React, { useState } from 'react';
import ValentinePage from './pages/ValentinePage';
import SuccessPage from './pages/SuccessPage';

const App: React.FC = () => {
  const [page, setPage] = useState<'valentine' | 'success'>('valentine');

  const handleYes = () => {
    setPage('success');
  };

  return (
    <div className="app">
      {page === 'valentine' && <ValentinePage onYes={handleYes} />}
      {page === 'success' && <SuccessPage />}
    </div>
  );
};

export default App;
