import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

const steps = [
    { id: 'uploading', label: 'Uploading Resume', minProgress: 0 },
    { id: 'extracting', label: 'Extracting Information', minProgress: 30 },
    { id: 'analyzing', label: 'Analyzing Skills & Projects', minProgress: 60 },
    { id: 'generating', label: 'Generating Portfolio Website', minProgress: 90 },
];

export const Processing = () => {
    const { resume } = useStore();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800">
                <div className="text-center mb-8">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="#2563eb"
                                strokeWidth="8"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: resume.progress / 100 }}
                                transition={{ duration: 0.5 }}
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-700 dark:text-gray-200">{resume.progress}%</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Building your site...</h2>
                    <p className="text-gray-500 dark:text-gray-400">Our AI is working its magic</p>
                </div>

                <div className="space-y-4">
                    {steps.map((step) => {
                        const isCompleted = resume.progress > step.minProgress + 25;
                        const isCurrent = resume.progress >= step.minProgress && !isCompleted;

                        return (
                            <div key={step.id} className="flex items-center gap-3">
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                ) : (
                                    <Circle className="w-5 h-5 text-gray-300 dark:text-slate-600" />
                                )}
                                <span className={`text-sm font-medium ${isCompleted || isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-500'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
