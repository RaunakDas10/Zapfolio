import { create } from 'zustand';
import type { AppState } from '../types';

export const useStore = create<AppState>((set) => ({
    resume: {
        file: null,
        status: 'idle',
        progress: 0,
    },
    portfolio: null,
    theme: 'modern',
    isDeploying: false,
    deployedUrl: null,
    isDarkMode: false,

    setResumeFile: (file) => set((state) => ({
        resume: { ...state.resume, file, status: 'idle', progress: 0 }
    })),
    setResumeStatus: (status) => set((state) => ({
        resume: { ...state.resume, status }
    })),
    setResumeProgress: (progress) => set((state) => ({
        resume: { ...state.resume, progress }
    })),
    setPortfolioData: (data) => set({ portfolio: data }),
    updatePortfolioSection: (section, data) => set((state) => {
        if (!state.portfolio) return state;
        return {
            portfolio: {
                ...state.portfolio,
                [section]: data
            }
        };
    }),
    setTheme: (theme) => set({ theme }),
    setDeploying: (isDeploying) => set({ isDeploying }),
    setDeployedUrl: (url) => set({ deployedUrl: url }),
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    reset: () => set({
        resume: { file: null, status: 'idle', progress: 0 },
        portfolio: null,
        theme: 'modern',
        isDeploying: false,
        deployedUrl: null
    })
}));
