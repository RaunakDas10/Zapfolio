import React, { useRef, useState } from 'react';
import { Upload, ArrowRight, Zap, Wand2, Monitor, Rocket, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import * as pdfjsLib from 'pdfjs-dist';
import { motion } from 'framer-motion';

// Setting worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const Landing = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setResumeFile, setPortfolioData, setResumeStatus, setResumeProgress } = useStore();
    const [isDragging, setIsDragging] = useState(false);

    // TODO: fine to expose key in local-only app as requested by user "only frontend"
    const API_KEY = "Gemini Api Key";

    const extractTextFromPDF = async (file: File): Promise<string> => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        // Simulating upload progress
        setResumeProgress(10);

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n';
        }
        setResumeProgress(30);
        return fullText;
    };

    const processResume = async (file: File) => {
        try {
            setResumeStatus('uploading');
            setResumeProgress(0);

            // 1. Read PDF Text locally
            let text = "";
            if (file.type === 'application/pdf') {
                text = await extractTextFromPDF(file);
            } else {
                text = await file.text();
            }

            setResumeStatus('processing');

            // SIMULATION MODE: No API Key required.
            // Simulate AI thinking time and progress updates
            const updateProgress = async () => {
                const stages = [40, 60, 80, 95];
                for (const progress of stages) {
                    await new Promise(r => setTimeout(r, 500));
                    setResumeProgress(progress);
                }
            };

            await updateProgress();

            setResumeProgress(100);

            // Mock Data Generation
            const mockPortfolioData = {
                hero: {
                    headline: "Hi, I'm Alex Dev",
                    subheadline: "Full Stack Engineer | UI/UX Enthusiast",
                    description: "I craft scalable applications and intuitive user experiences. Passionate about React, Node.js, and modern web technologies."
                },
                about: {
                    title: "About Me",
                    content: "I am a dedicated software engineer with 5+ years of experience in building web applications. I love solving complex problems and learning new technologies. When I'm not coding, you can find me hiking or reading sci-fi novels."
                },
                experience: [
                    {
                        id: "1",
                        role: "Senior Frontend Engineer",
                        company: "TechFlow Solutions",
                        duration: "2021 - Present",
                        description: "Led the migration of a legacy Angular app to React, improving performance by 40%. Mentored junior developers and established code quality standards."
                    },
                    {
                        id: "2",
                        role: "Software Developer",
                        company: "Creative Digital",
                        duration: "2019 - 2021",
                        description: "Collaborated with designers to implement pixel-perfect UIs. Integrated RESTful APIs and optimized database queries."
                    }
                ],
                projects: [
                    {
                        id: "1",
                        title: "E-Commerce Dashboard",
                        description: "A real-time analytics dashboard for online retailers. Features include sales tracking, inventory management, and custom reporting.",
                        tags: ["React", "TypeScript", "Chart.js"]
                    },
                    {
                        id: "2",
                        title: "TaskMaster",
                        description: "A collaborative project management tool. Supports drag-and-drop tasks, team chat, and file sharing.",
                        tags: ["Vue.js", "Firebase", "Tailwind"]
                    }
                ],
                skills: ["JavaScript", "TypeScript", "React", "Node.js", "GraphQL", "AWS", "Tailwind CSS"],
                contact: {
                    email: "alex.dev@example.com",
                    linkedin: "linkedin.com/in/alexdev",
                    github: "github.com/alexdev"
                }
            };

            setPortfolioData(mockPortfolioData);
            setResumeStatus('ready');

        } catch (error) {
            console.error("Processing failed:", error);
            alert("Failed to process resume. Please try again.");
            setResumeStatus('idle');
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResumeFile(file);
            await processResume(file);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setResumeFile(file);
            await processResume(file);
        }
    };

    const onUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
            {/* Navbar */}
            <nav className="border-b border-white/5 backdrop-blur-sm fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                            Zapfolio
                        </span>
                    </div>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 hidden sm:flex">
                        Star on GitHub
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-32 pb-20 px-6 overflow-hidden relative">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse delay-700" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Now running 100% in your browser
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                            Transform your resume into a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400">
                                stunning portfolio site.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Drop your regular PDF resume. Our AI reads it, parses the details, and builds a professional portfolio website in seconds. No coding required.
                    </motion.p>

                    {/* Upload Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`max-w-xl mx-auto backdrop-blur-md bg-white/5 border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 group cursor-pointer
                        ${isDragging ? 'border-blue-500 bg-blue-500/5 scale-105' : 'border-white/10 hover:border-white/20 hover:bg-white/10'}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Upload your resume</h3>
                        <p className="text-slate-400 mb-8">Supports PDF or DOCX (Max 10MB)</p>
                        <Button size="lg" className="w-full bg-white text-slate-950 hover:bg-slate-200">
                            Select File
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.docx,.txt"
                            onChange={handleFileSelect}
                        />
                    </motion.div>
                </div>
            </main>

            {/* Feature Grid */}
            <section className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Magical Transformation</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">We don't just extract text. We understand your career story and craft a narrative that stands out.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Wand2, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", title: "Smart Extraction", desc: "Our AI identifies your key skills, achievements, and metrics." },
                            { icon: Monitor, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", title: "Live Preview", desc: "Watch your site come to life instantly. Edit content inline." },
                            { icon: Rocket, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", title: "One-Click Deploy", desc: "Your own .zapfolio.app domain, live in seconds." }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Step */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white leading-tight">From PDF to <br /> Website in 3 Steps</h2>
                            <div className="space-y-8">
                                {[
                                    { num: "01", title: "Upload Resume", desc: "Drop your existing PDF or DOCX resume. No re-typing needed." },
                                    { num: "02", title: "Customise Design", desc: "Choose from our modern, minimal, or dark themes." },
                                    { num: "03", title: "Share with World", desc: "Get a unique link to share on LinkedIn and Twitter." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="text-3xl font-black text-slate-200 dark:text-slate-800">{step.num}</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20 transform rotate-3"></div>
                            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                {/* Mock Browser Window */}
                                <div className="h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="p-8 space-y-4 opacity-50">
                                    <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="h-32 bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                                        <div className="h-32 bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Button size="lg" className="shadow-2xl text-lg px-8 py-6" onClick={onUploadClick}>
                                        Try it Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 dark:text-white">Loved by Developers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah J.", role: "Frontend Dev", text: "I hated updating my portfolio. Zapfolio did it in 30 seconds. Best tool ever." },
                            { name: "Mike T.", role: "UX Designer", text: "The generated designs are clean and actually usable. deploying was a breeze." },
                            { name: "Anita R.", role: "Student", text: "Got my first internship thanks to the professional site this built for me!" }
                        ].map((t, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-left">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">"{t.text}"</p>
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white text-center transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to showcase your work?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of developers who are landing jobs with their Zapfolio portfolios.</p>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 h-14 rounded-full border-none" onClick={onUploadClick}>
                        Build My Portfolio
                    </Button>
                </div>
            </section>

        </div >
    );
};
