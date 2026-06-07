import React, { useState, useEffect } from 'react';
import { PortfolioConfig } from './types';
import { DEFAULT_PORTFOLIO_CONFIG } from './data/defaultConfig';
import { THEMES } from './data/themes';
import PortfolioViewer from './components/PortfolioViewer';
import EditorDrawer from './components/EditorDrawer';
import ExportModal from './components/ExportModal';

const LOCAL_STORAGE_KEY = 'friend_portfolio_custom_config_v1';

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(DEFAULT_PORTFOLIO_CONFIG);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);

  // Initialize data on load
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure standard fields are available in case the model modifications update types
        setConfig({
          ...DEFAULT_PORTFOLIO_CONFIG,
          ...parsed,
          socials: {
            ...DEFAULT_PORTFOLIO_CONFIG.socials,
            ...(parsed.socials || {})
          }
        });
      } catch (e) {
        console.error('Failed to parse saved config from local storage', e);
      }
    }
  }, []);

  // Sync back to localstorage immediately upon state change
  const handleConfigChange = (newConfig: PortfolioConfig) => {
    setConfig(newConfig);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
  };

  // Reset config back to baseline defaults
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your friend\'s customized data back to the default portfolio persona?')) {
      setConfig(DEFAULT_PORTFOLIO_CONFIG);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  // Derive active visual theme configuration
  const activeTheme = THEMES.find(t => t.id === config.themeId) || THEMES[0];

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Portfolio visual viewer screen */}
      <PortfolioViewer
        config={config}
        theme={activeTheme}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenDeploy={() => setIsDeployModalOpen(true)}
      />

      {/* Slide out editor controls */}
      <EditorDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        onChange={handleConfigChange}
        onReset={handleReset}
      />

      {/* GitHub Pages deploy guidance overlay */}
      <ExportModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        config={config}
      />
    </div>
  );
}
