import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemePreset, ThemePresetId, ThemeColors, UserThemeSettings } from '../../types';
import { THEME_PRESETS, DEFAULT_THEME_SETTINGS } from '../../data/themePresets';
import { getStoredThemeSettings, saveStoredThemeSettings } from '../../services/storageService';

interface ThemeContextType {
  settings: UserThemeSettings;
  activePreset: ThemePreset;
  currentColors: ThemeColors;
  isDark: boolean;
  setMode: (mode: UserThemeSettings['mode']) => void;
  setPreset: (presetId: ThemePresetId) => void;
  setCustomColors: (colors: Partial<UserThemeSettings['customColors']>) => void;
  setIsCustomColorsEnabled: (enabled: boolean) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserThemeSettings>(() => getStoredThemeSettings());
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen to system dark mode changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isDark = useMemo(() => {
    if (settings.mode === 'dark') return true;
    if (settings.mode === 'light') return false;
    return systemPrefersDark;
  }, [settings.mode, systemPrefersDark]);

  const activePreset = useMemo(() => {
    return THEME_PRESETS[settings.activePresetId] || THEME_PRESETS.cute;
  }, [settings.activePresetId]);

  const currentColors = useMemo<ThemeColors>(() => {
    const basePalette = isDark ? activePreset.dark : activePreset.light;
    if (!settings.isCustomColorsEnabled) {
      return basePalette;
    }

    return {
      ...basePalette,
      primary: settings.customColors.primary || basePalette.primary,
      accent: settings.customColors.accent || basePalette.accent,
      background: settings.customColors.background || basePalette.background,
      surface: settings.customColors.surface || basePalette.surface,
      text: settings.customColors.text || basePalette.text,
    };
  }, [activePreset, isDark, settings.isCustomColorsEnabled, settings.customColors]);

  // Apply CSS custom properties to document root
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--color-primary', currentColors.primary);
    root.style.setProperty('--color-primary-hover', currentColors.primaryHover || currentColors.primary);
    root.style.setProperty('--color-accent', currentColors.accent);
    root.style.setProperty('--color-background', currentColors.background);
    root.style.setProperty('--color-surface', currentColors.surface);
    root.style.setProperty('--color-surface-hover', currentColors.surfaceHover || currentColors.surface);
    root.style.setProperty('--color-text', currentColors.text);
    root.style.setProperty('--color-muted', currentColors.muted);
    root.style.setProperty('--color-border', currentColors.border);
    root.style.setProperty('--radius', activePreset.borderRadius);
    root.style.setProperty('--font-heading', activePreset.fontFamilyHeading);
    root.style.setProperty('--font-body', activePreset.fontFamilyBody);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    saveStoredThemeSettings(settings);
  }, [settings, isDark, activePreset, currentColors]);

  const setMode = (mode: UserThemeSettings['mode']) => {
    setSettings((prev) => ({ ...prev, mode }));
  };

  const setPreset = (presetId: ThemePresetId) => {
    setSettings((prev) => ({ ...prev, activePresetId: presetId }));
  };

  const setCustomColors = (newColors: Partial<UserThemeSettings['customColors']>) => {
    setSettings((prev) => ({
      ...prev,
      isCustomColorsEnabled: true,
      customColors: { ...prev.customColors, ...newColors },
    }));
  };

  const setIsCustomColorsEnabled = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, isCustomColorsEnabled: enabled }));
  };

  const resetTheme = () => {
    setSettings(DEFAULT_THEME_SETTINGS);
  };

  return (
    <ThemeContext.Provider
      value={{
        settings,
        activePreset,
        currentColors,
        isDark,
        setMode,
        setPreset,
        setCustomColors,
        setIsCustomColorsEnabled,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
