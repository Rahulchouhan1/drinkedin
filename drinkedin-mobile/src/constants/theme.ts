/**
 * DrinkEdIn Design Tokens
 * Premium dark-mode color palette for a nightlife/social app
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1A1A2E',
    textSecondary: '#6B7280',
    background: '#FAFAFA',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    card: '#FFFFFF',
    border: '#E5E7EB',
    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    accent: '#F59E0B',
    success: '#10B981',
    danger: '#EF4444',
    gradientStart: '#7C3AED',
    gradientEnd: '#EC4899',
  },
  dark: {
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    background: '#0A0A0F',
    backgroundElement: '#1A1A2E',
    backgroundSelected: '#2E3135',
    card: '#16162A',
    border: '#2D2D44',
    primary: '#A78BFA',
    primaryLight: '#C4B5FD',
    accent: '#FBBF24',
    success: '#34D399',
    danger: '#F87171',
    gradientStart: '#7C3AED',
    gradientEnd: '#EC4899',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
