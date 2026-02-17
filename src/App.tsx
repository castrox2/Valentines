import React, { useState } from 'react';
import { DEFAULT_APP_CONFIG, ValentineAppConfig } from './config/appConfig';
import SetupPage from './pages/SetupPage';
import ValentinePage from './pages/ValentinePage';
import SuccessPage from './pages/SuccessPage';

type AppPage = 'setup' | 'valentine' | 'success';
type SessionMode = 'send' | 'received';

const App: React.FC = () => {
  const [config, setConfig] = useState<ValentineAppConfig>(DEFAULT_APP_CONFIG);
  const [page, setPage] = useState<AppPage>('setup');
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [sessionMode, setSessionMode] = useState<SessionMode | null>(null);

  const handleSaveCustomization = (nextConfig: ValentineAppConfig, mode: SessionMode) => {
    setConfig(nextConfig);
    setSessionMode(mode);
    setPage('valentine');
    setIsFirstLaunch(false);
  };

  const handleYes = () => {
    setPage('success');
  };

  const handleBackFromSuccess = () => {
    setPage('valentine');
  };

  const handleOpenCustomization = () => {
    setPage('setup');
  };

  return (
    <div className="app">
      {page === 'setup' && (
        <SetupPage
          initialConfig={config}
          isFirstLaunch={isFirstLaunch}
          onSave={handleSaveCustomization}
        />
      )}
      {page === 'valentine' && (
        <ValentinePage
          onYes={handleYes}
          onOpenCustomization={handleOpenCustomization}
          maxNoAttempts={config.maxNoAttempts}
          noLabels={config.noLabels}
        />
      )}
      {page === 'success' && (
        <SuccessPage
          successTitle={config.successTitle}
          successMessage={config.successMessage}
          successPlaceholderText={config.successPlaceholderText}
          showBackButton={sessionMode === 'send'}
          onBack={sessionMode === 'send' ? handleBackFromSuccess : undefined}
        />
      )}
    </div>
  );
};

export default App;
