import { Zap, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';

export const Navbar = () => {
    const { isDarkMode, toggleDarkMode, reset } = useStore();

    return (
        <nav className="h-16 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50 transition-colors">
            <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Zapfolio</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                        {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                    </Button>
                    <Button size="sm" className="rounded-full">Get Started</Button>
                </div>
            </div>
        </nav>
    );
};
