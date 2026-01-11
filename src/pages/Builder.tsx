import { useState } from 'react';
import { useStore } from '../store/useStore';
import { EditableText } from '../components/ui/EditableText';
import { Button } from '../components/ui/Button';
import { Share2, Globe, Github, Linkedin, Smartphone, Monitor, Code, X, Copy } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Theme } from '../types';
import { generatePortfolioCode } from '../lib/codeGenerator';

export const Builder = () => {
    const { portfolio, updatePortfolioSection, theme, setTheme, setDeploying, setDeployedUrl } = useStore();
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [showCode, setShowCode] = useState(false);
    const [showDeployModal, setShowDeployModal] = useState(false);

    if (!portfolio) return null;

    const handleDeploy = () => {
        // Download Feature
        const htmlCode = generatePortfolioCode(portfolio);
        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // Auto-download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert("Code Downloaded! You can open this HTML file in your browser.");
    };

    const handleShuffle = () => {
        const themes: any[] = ['modern', 'minimal', 'light', 'dark'];
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setTheme(randomTheme);

        // Randomize accent color if we had that state connected
        // For now, just shuffling the theme provides significant visual change
    };

    if (showDeployModal && useStore.getState().deployedUrl) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6 animate-in zoom-in-50 duration-300 border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Share2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Portfolio Deployed!</h2>
                        <p className="text-gray-500 dark:text-gray-400">Your site is now live and ready to share with the world.</p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center justify-between gap-2">
                        <code className="text-sm text-blue-600 dark:text-blue-400 font-medium truncate">{useStore.getState().deployedUrl}</code>
                        <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(useStore.getState().deployedUrl!)}>
                            Copy
                        </Button>
                    </div>

                    <div className="flex gap-3">
                        <a href={useStore.getState().deployedUrl!} target="_blank" rel="noreferrer" className="flex-1">
                            <Button className="w-full">
                                <Globe className="w-4 h-4 mr-2" />
                                Open Site
                            </Button>
                        </a>
                        <Button variant="outline" className="flex-1 dark:text-white" onClick={() => useStore.getState().setDeployedUrl(null)}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (showCode) {
        const code = generatePortfolioCode(portfolio);
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
                <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden border border-slate-700 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                        <h3 className="text-white font-mono font-medium flex items-center gap-2">
                            <Code className="w-4 h-4 text-blue-400" /> Generated Source Code
                        </h3>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" onClick={() => navigator.clipboard.writeText(code)}>
                                <Copy className="w-4 h-4 mr-2" /> Copy
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setShowCode(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-0">
                        <pre className="p-6 text-sm font-mono text-blue-100 leading-relaxed bg-slate-900">
                            <code>{code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }

    // Theme Styles
    const themeStyles: Record<Theme, string> = {
        light: "bg-white text-gray-900 font-sans",
        dark: "bg-slate-900 text-white font-sans",
        minimal: "bg-gray-50 text-gray-800 font-mono",
        modern: "bg-white text-slate-900 font-sans", // Default
    };

    const containerClass = themeStyles[theme];

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
            {/* Sidebar Controls */}
            <aside className="w-[500px] border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-20 shadow-xl transition-colors duration-300">
                <div className="p-6 border-b border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <h2 className="font-bold text-lg dark:text-white flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-500" /> Source Code
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">This code is generated automatically from your resume.</p>
                </div>

                <div className="flex-1 p-0 overflow-hidden relative group">
                    <textarea
                        className="w-full h-full resize-none bg-slate-50 dark:bg-slate-950 p-6 font-mono text-xs text-slate-600 dark:text-slate-400 focus:outline-none"
                        readOnly
                        value={generatePortfolioCode(portfolio)}
                    />
                    <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        onClick={() => navigator.clipboard.writeText(generatePortfolioCode(portfolio))}
                    >
                        <Copy className="w-3 h-3 mr-2" /> Copy
                    </Button>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <Button className="w-full h-12 text-lg shadow-lg shadow-blue-500/20" size="lg" onClick={handleDeploy}>
                        <Share2 className="w-5 h-5 mr-2" />
                        Deploy Website
                    </Button>
                    <Button variant="outline" className="w-full h-12 text-lg mt-3" size="lg" onClick={handleDeploy}>
                        <Code className="w-5 h-5 mr-2" />
                        Download Code
                    </Button>
                </div>
            </aside>

            {/* Preview Area */}
            <main className="flex-1 overflow-hidden flex flex-col relative w-full bg-gray-100/50 dark:bg-black/20">
                <div className="flex-1 overflow-y-auto scroll-smooth w-full flex justify-center p-8">
                    <div
                        className={cn(
                            "bg-white shadow-2xl transition-all duration-500 ease-in-out relative origin-top",
                            viewMode === 'mobile' ? "w-[375px] rounded-3xl min-h-[812px] border-[8px] border-gray-900" : "w-full max-w-[1400px] rounded-none border-none",
                            containerClass
                        )}
                        style={{
                            minHeight: viewMode === 'mobile' ? '812px' : '100%'
                        }}
                    >
                        {/* Mock Phone Notch */}
                        {viewMode === 'mobile' && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-20"></div>
                        )}

                        {/* Content Wrapper */}
                        <div className={cn("h-full overflow-y-auto custom-scrollbar", viewMode === 'mobile' ? "rounded-2xl bg-inherit" : "")}>

                            {/* === LAYOUT: MINIMAL === */}
                            {theme === 'minimal' && (
                                <div className="p-8 md:p-16 max-w-4xl mx-auto font-mono text-gray-800">
                                    <header className="mb-20 border-b-2 border-gray-900 pb-8">
                                        <EditableText
                                            tagName="h1"
                                            value={portfolio.hero.headline}
                                            onChange={(val) => updatePortfolioSection('hero', { ...portfolio.hero, headline: val })}
                                            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase"
                                        />
                                        <EditableText
                                            tagName="p"
                                            value={portfolio.hero.subheadline}
                                            onChange={(val) => updatePortfolioSection('hero', { ...portfolio.hero, subheadline: val })}
                                            className="text-xl text-gray-600 mb-6"
                                        />
                                        <div className="flex gap-4">
                                            <Button variant="outline" className="border-2 border-gray-900 rounded-none hover:bg-gray-900 hover:text-white transition-all uppercase text-xs font-bold tracking-widest">
                                                Email Me
                                            </Button>
                                            {portfolio.contact.linkedin && <Button variant="ghost" className="hover:underline uppercase text-xs font-bold tracking-widest">LinkedIn</Button>}
                                        </div>
                                    </header>

                                    <section className="mb-20">
                                        <h2 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-gray-200 pb-2">Experience</h2>
                                        <div className="space-y-12">
                                            {portfolio.experience.map((exp, index) => (
                                                <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                    <div className="text-sm text-gray-500">{exp.duration}</div>
                                                    <div className="md:col-span-3">
                                                        <EditableText tagName="h3" value={exp.role} onChange={(val) => { const n = [...portfolio.experience]; n[index].role = val; updatePortfolioSection('experience', n) }} className="font-bold text-lg" />
                                                        <EditableText tagName="div" value={exp.company} onChange={(val) => { const n = [...portfolio.experience]; n[index].company = val; updatePortfolioSection('experience', n) }} className="text-gray-600 mb-2" />
                                                        <EditableText tagName="p" value={exp.description} onChange={(val) => { const n = [...portfolio.experience]; n[index].description = val; updatePortfolioSection('experience', n) }} className="text-sm leading-relaxed" multiline />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-gray-200 pb-2">Selected Works</h2>
                                        <ul className="space-y-6">
                                            {portfolio.projects.map((proj, index) => (
                                                <li key={proj.id} className="group cursor-pointer">
                                                    <div className="flex items-baseline justify-between mb-1">
                                                        <EditableText tagName="h3" value={proj.title} onChange={(val) => { const n = [...portfolio.projects]; n[index].title = val; updatePortfolioSection('projects', n) }} className="text-xl font-bold group-hover:underline decoration-2 underline-offset-4" />
                                                        <span className="text-xs text-gray-400 group-hover:text-gray-900 transition-colors">↗</span>
                                                    </div>
                                                    <EditableText tagName="p" value={proj.description} onChange={(val) => { const n = [...portfolio.projects]; n[index].description = val; updatePortfolioSection('projects', n) }} className="text-gray-500 text-sm" />
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            )}

                            {/* === LAYOUT: MODERN / DEFAULT / DARK / LIGHT === */}
                            {theme !== 'minimal' && (
                                <>
                                    <section className="min-h-[60vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
                                        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                                            <EditableText
                                                tagName="h1"
                                                value={portfolio.hero.headline}
                                                onChange={(val) => updatePortfolioSection('hero', { ...portfolio.hero, headline: val })}
                                                className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
                                            />
                                            <EditableText
                                                tagName="p"
                                                value={portfolio.hero.subheadline}
                                                onChange={(val) => updatePortfolioSection('hero', { ...portfolio.hero, subheadline: val })}
                                                className="text-xl md:text-2xl text-opacity-80 mb-6 font-medium"
                                            />
                                            <EditableText
                                                tagName="p"
                                                value={portfolio.hero.description}
                                                onChange={(val) => updatePortfolioSection('hero', { ...portfolio.hero, description: val })}
                                                className="text-lg text-opacity-70 max-w-2xl leading-relaxed"
                                                multiline
                                            />
                                            <div className="flex gap-4 mt-8">
                                                {portfolio.contact.github && <Button variant="outline" size="icon" className="rounded-full"><Github className="w-5 h-5" /></Button>}
                                                {portfolio.contact.linkedin && <Button variant="outline" size="icon" className="rounded-full"><Linkedin className="w-5 h-5" /></Button>}
                                                <Button variant="default" className="rounded-full px-6">Contact Me</Button>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="py-20 px-8 md:px-16 lg:px-24 bg-black/5 dark:bg-white/5">
                                        <div className="max-w-4xl">
                                            <EditableText
                                                tagName="h2"
                                                value={portfolio.about.title}
                                                onChange={(val) => updatePortfolioSection('about', { ...portfolio.about, title: val })}
                                                className="text-3xl font-bold mb-8"
                                            />
                                            <EditableText
                                                tagName="div"
                                                value={portfolio.about.content}
                                                onChange={(val) => updatePortfolioSection('about', { ...portfolio.about, content: val })}
                                                className="text-lg leading-relaxed text-opacity-80"
                                                multiline
                                            />
                                        </div>
                                    </section>

                                    <section className="py-20 px-8 md:px-16 lg:px-24">
                                        <div className="max-w-4xl">
                                            <h2 className="text-3xl font-bold mb-12">Experience</h2>
                                            <div className="space-y-12">
                                                {portfolio.experience.map((exp, index) => (
                                                    <div key={exp.id} className="group relative border-l-2 border-gray-200 dark:border-gray-700 pl-8 pb-8 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors"></div>
                                                        <EditableText
                                                            tagName="h3"
                                                            value={exp.role}
                                                            onChange={(val) => { const newExp = [...portfolio.experience]; newExp[index].role = val; updatePortfolioSection('experience', newExp); }}
                                                            className="text-2xl font-bold mb-1"
                                                        />
                                                        <div className="flex items-center gap-2 mb-4 text-sm font-medium uppercase tracking-wide opacity-60">
                                                            <EditableText tagName="span" value={exp.company} onChange={(val) => { const newExp = [...portfolio.experience]; newExp[index].company = val; updatePortfolioSection('experience', newExp); }} />
                                                            <span>•</span>
                                                            <EditableText tagName="span" value={exp.duration} onChange={(val) => { const newExp = [...portfolio.experience]; newExp[index].duration = val; updatePortfolioSection('experience', newExp); }} />
                                                        </div>
                                                        <EditableText tagName="p" value={exp.description} onChange={(val) => { const newExp = [...portfolio.experience]; newExp[index].description = val; updatePortfolioSection('experience', newExp); }} className="text-lg opacity-80" multiline />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    <section className="py-20 px-8 md:px-16 lg:px-24">
                                        <div className="max-w-6xl">
                                            <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {portfolio.projects.map((proj, index) => (
                                                    <div key={proj.id} className="p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/20 shadow-sm hover:shadow-md transition-all">
                                                        <EditableText tagName="h3" value={proj.title} onChange={(val) => { const newProjs = [...portfolio.projects]; newProjs[index].title = val; updatePortfolioSection('projects', newProjs); }} className="text-2xl font-bold mb-4" />
                                                        <EditableText tagName="p" value={proj.description} onChange={(val) => { const newProjs = [...portfolio.projects]; newProjs[index].description = val; updatePortfolioSection('projects', newProjs); }} className="text-lg opacity-80 mb-6" multiline />
                                                        <div className="flex flex-wrap gap-2">
                                                            {proj.tags.map(tag => (
                                                                <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 opacity-80">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
