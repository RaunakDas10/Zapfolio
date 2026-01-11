import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 pt-16 pb-12 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">Zapfolio</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            Transform your resume into a stunning, deployable portfolio website in seconds with the power of AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Templates</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Showcase</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
                    © {new Date().getFullYear()} Zapfolio. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
