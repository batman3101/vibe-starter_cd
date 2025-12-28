import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Settings } from '@/types';

// ============================================
// 기본 설정
// ============================================

const DEFAULT_SETTINGS: Settings = {
  apiKey: undefined,
  theme: 'system',
  language: 'ko',
  autoSave: true,
  autoSaveInterval: 500, // 500ms 디바운스
};

// ============================================
// 스토어 타입
// ============================================

interface SettingsState {
  // 상태
  settings: Settings;
  isApiKeyValid: boolean | null; // null = 검증 전

  // 액션
  setApiKey: (apiKey: string | undefined) => void;
  setTheme: (theme: Settings['theme']) => void;
  setLanguage: (language: Settings['language']) => void;
  setAutoSave: (enabled: boolean) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  setApiKeyValid: (isValid: boolean | null) => void;
  resetSettings: () => void;
}

// ============================================
// 스토어 생성
// ============================================

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // 초기 상태
      settings: DEFAULT_SETTINGS,
      isApiKeyValid: null,

      // 액션
      setApiKey: (apiKey) => {
        set((state) => ({
          settings: { ...state.settings, apiKey },
          isApiKeyValid: null, // 새 키 설정 시 검증 상태 리셋
        }));
      },

      setTheme: (theme) => {
        set((state) => ({
          settings: { ...state.settings, theme },
        }));
      },

      setLanguage: (language) => {
        set((state) => ({
          settings: { ...state.settings, language },
        }));
      },

      setAutoSave: (autoSave) => {
        set((state) => ({
          settings: { ...state.settings, autoSave },
        }));
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      setApiKeyValid: (isApiKeyValid) => set({ isApiKeyValid }),

      resetSettings: () => set({
        settings: DEFAULT_SETTINGS,
        isApiKeyValid: null,
      }),
    }),
    {
      name: 'vibedocs-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
      }),
    }
  )
);

// ============================================
// 헬퍼 훅
// ============================================

export const useApiKey = () => {
  const apiKey = useSettingsStore((state) => state.settings.apiKey);
  const isApiKeyValid = useSettingsStore((state) => state.isApiKeyValid);
  const setApiKey = useSettingsStore((state) => state.setApiKey);
  const setApiKeyValid = useSettingsStore((state) => state.setApiKeyValid);

  return {
    apiKey,
    isApiKeyValid,
    hasApiKey: !!apiKey,
    setApiKey,
    setApiKeyValid,
  };
};

export const useTheme = () => {
  const theme = useSettingsStore((state) => state.settings.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  return { theme, setTheme };
};
