export interface ResumeConfig {
    file: File | null;
    status: 'idle' | 'uploading' | 'processing' | 'ready';
    progress: number;
}

export interface PortfolioData {
    hero: {
        headline: string;
        subheadline: string;
        description: string;
    };
    about: {
        title: string;
        content: string;
    };
    experience: Array<{
        id: string;
        role: string;
        company: string;
        duration: string;
        description: string;
    }>;
    projects: Array<{
        id: string;
        title: string;
        description: string;
        link?: string;
        tags: string[];
    }>;
    skills: string[];
    contact: {
        email: string;
        linkedin?: string;
        github?: string;
    };
}

export type Theme = 'light' | 'dark' | 'minimal' | 'modern';

export interface AppState {
    resume: ResumeConfig;
    portfolio: PortfolioData | null;
    theme: Theme;
    isDeploying: boolean;
    deployedUrl: string | null;
    isDarkMode: boolean;

    setResumeFile: (file: File) => void;
    setResumeStatus: (status: ResumeConfig['status']) => void;
    setResumeProgress: (progress: number) => void;
    setPortfolioData: (data: PortfolioData) => void;
    updatePortfolioSection: (section: keyof PortfolioData, data: any) => void;
    setTheme: (theme: Theme) => void;
    setDeploying: (isDeploying: boolean) => void;
    setDeployedUrl: (url: string | null) => void;
    toggleDarkMode: () => void;
    reset: () => void;
}
