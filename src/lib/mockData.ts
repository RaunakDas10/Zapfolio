import type { PortfolioData } from '../types';

export const personas: PortfolioData[] = [
    {
        hero: {
            headline: "Hi, I'm Alex Developer",
            subheadline: "Full Stack Engineer | UI/UX Enthusiast",
            description: "I build accessible, pixel-perfect, and performant web experiences."
        },
        about: {
            title: "About Me",
            content: "I am a passionate developer with 5 years of experience in building modern web applications. I love solving complex problems and learning new technologies."
        },
        experience: [
            { id: '1', role: "Senior Frontend Engineer", company: "Tech Corp", duration: "2021 - Present", description: "Led development of core features using React and TypeScript." },
            { id: '2', role: "Software Developer", company: "DevStudio", duration: "2019 - 2021", description: "Built customized web solutions for clients using MERN stack." }
        ],
        projects: [
            { id: '1', title: "E-Commerce Platform", description: "A fully functional online store with Stripe integration.", tags: ["React", "Node.js", "MongoDB"] },
            { id: '2', title: "Task Manager", description: "Collaborative project management tool for remote teams.", tags: ["Vue.js", "Firebase"] }
        ],
        skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL"],
        contact: {
            email: "alex@example.com",
            linkedin: "linkedin.com/in/alex",
            github: "github.com/alex"
        }
    },
    {
        hero: {
            headline: "Sarah Creative",
            subheadline: "Digital Product Designer",
            description: "Crafting digital experiences that merge art, technology, and human psychology."
        },
        about: {
            title: "My Story",
            content: "With a background in fine arts and 6 years in product design, I bring a unique perspective to digital interfaces. I believe in design that serves humanity."
        },
        experience: [
            { id: '1', role: "Lead Product Designer", company: "Innovate Inc", duration: "2020 - Present", description: "Spearheading the design system and UX strategy for enterprise products." },
            { id: '2', role: "UI/UX Designer", company: "Creative Agency", duration: "2018 - 2020", description: "Worked with startups to define their visual identity and product MVP." }
        ],
        projects: [
            { id: '1', title: "Finance App Redesign", description: "Complete overhaul of a banking app focusing on accessibility and ease of use.", tags: ["Figma", "Prototyping", "User Research"] },
            { id: '2', title: "Design System 2.0", description: "Scalable design system used by 50+ developers and designers.", tags: ["Design Systems", "Tokens", "Documentation"] }
        ],
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "HTML/CSS"],
        contact: {
            email: "sarah@example.com",
            linkedin: "linkedin.com/in/sarah",
            github: "github.com/sarah"
        }
    },
    {
        hero: {
            headline: "Jordan Data",
            subheadline: "Data Scientist & AI Researcher",
            description: "Turning raw data into actionable insights and intelligent models."
        },
        about: {
            title: "About",
            content: "I specialize in machine learning, natural language processing, and big data analytics. My goal is to make AI accessible and beneficial for everyone."
        },
        experience: [
            { id: '1', role: "Senior Data Scientist", company: "DataFlow", duration: "2022 - Present", description: "Developing predictive models for customer churn and retention." },
            { id: '2', role: "ML Engineer", company: "AI Startup", duration: "2020 - 2022", description: "Built and deployed NLP models for sentiment analysis." }
        ],
        projects: [
            { id: '1', title: "AlgoTrader", description: "Automated trading bot using reinforcement learning agents.", tags: ["Python", "TensorFlow", "Pandas"] },
            { id: '2', title: "Health Analytics", description: "Predictive modeling for early disease detection using patient data.", tags: ["Scikit-learn", "HealthTech", "Big Data"] }
        ],
        skills: ["Python", "PyTorch", "SQL", "AWS", "Data Visualization"],
        contact: {
            email: "jordan@example.com",
            linkedin: "linkedin.com/in/jordan",
            github: "github.com/jordan"
        }
    }
];
