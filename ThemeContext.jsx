import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const DEFAULT_CHAT_SETTINGS = {
  colorMode: 'dark', // 'dark' | 'light'
  workspaceTheme: 'dark-glass', // 'dark-glass' | 'premium-dark' | 'teams-style' | 'emerald-pro' | 'workspace-gradient' | 'light'
  wallpaper: 'abstract-waves', // 'abstract-waves' | 'mesh-gradient' | 'mountains' | 'forest' | 'aurora-lights' | 'geometric-grid' | 'galaxy' | 'custom'
  customWallpaperUrl: '',
  accentColor: 'violet', // 'violet' | 'emerald' | 'blue' | 'rose' | 'amber'
  fontSize: 'medium', // 'small' (15px), 'medium' (18px), 'large' (20.5px), 'xlarge' (23px)
  bubbleStyle: 'modern-glass', // 'modern-glass' | 'rounded' | 'classic'
  layoutMode: 'comfortable', // 'comfortable' | 'compact'
  soundEnabled: true,
  notifications: true,
  mentionAlerts: true,
  meetingReminders: true,
  enterToSend: true,
  readReceipts: true,
  onlineStatus: true,
  autoMuteMic: false,
  autoTurnOffCamera: false
};

const SETTINGS_KEY = 'exactspace_chat_workplace_settings_v6';

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return { ...DEFAULT_CHAT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to load settings', e);
    }
    return DEFAULT_CHAT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) { }

    // Apply color mode (dark/light)
    document.documentElement.setAttribute('data-theme', settings.colorMode);

    // Apply workspace theme
    document.documentElement.setAttribute('data-workspace-theme', settings.workspaceTheme);

    // Apply accent color
    document.documentElement.setAttribute('data-accent', settings.accentColor);

    // Apply layout mode
    document.documentElement.setAttribute('data-layout', settings.layoutMode);

    // Apply bubble style
    document.documentElement.setAttribute('data-bubble-style', settings.bubbleStyle);

    // Apply font-size custom property
    const fontSizes = {
      small: '16px',
      medium: '18px',
      large: '21px',
      xlarge: '24px'
    };
    document.documentElement.style.setProperty('--chat-font-size-base', fontSizes[settings.fontSize] || '18px');
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const setColorMode = (mode) => {
    setSettings(prev => ({ ...prev, colorMode: mode }));
  };

  const setWorkspaceTheme = (themeId) => {
    setSettings(prev => ({
      ...prev,
      workspaceTheme: themeId,
      colorMode: themeId === 'light' ? 'light' : 'dark'
    }));
  };

  const setWallpaper = (wallpaperId, customUrl = '') => {
    setSettings(prev => ({
      ...prev,
      wallpaper: wallpaperId,
      customWallpaperUrl: customUrl || prev.customWallpaperUrl
    }));
  };

  return (
    <ThemeContext.Provider value={{
      settings,
      updateSetting,
      setColorMode,
      setWorkspaceTheme,
      setWallpaper
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
