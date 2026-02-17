import React, { useMemo, useState } from 'react';
import {
  DEFAULT_APP_CONFIG,
  ValentineAppConfig,
  loadSavedConfig,
  saveConfig,
} from './config/appConfig';
import SetupPage from './pages/SetupPage';
import ValentinePage from './pages/ValentinePage';
import SuccessPage from './pages/SuccessPage';

type AppPage = 'setup' | 'valentine' | 'success';

const App: React.FC = () => {
  const initialSavedConfig = useMemo(() => loadSavedConfig(), []);

  const [config, setConfig] = useState<ValentineAppConfig>(
    initialSavedConfig ?? DEFAULT_APP_CONFIG
  );
  const [page, setPage] = useState<AppPage>(initialSavedConfig ? 'valentine' : 'setup');
  const [isFirstLaunch, setIsFirstLaunch] = useState(!initialSavedConfig);

  const handleSaveCustomization = (nextConfig: ValentineAppConfig) => {
    const normalizedConfig = saveConfig(nextConfig);
    setConfig(normalizedConfig);
    setPage('valentine');
    setIsFirstLaunch(false);
  };

  const handleYes = () => {
    setPage('success');
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
        />
      )}
    </div>
  );
};

export default App;
