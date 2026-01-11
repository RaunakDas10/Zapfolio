import type { PortfolioData } from '../types';

export const generatePortfolioCode = (data: PortfolioData): string => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.hero.headline}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-50 text-slate-900">

    <!-- Hero -->
    <header class="min-h-[80vh] flex flex-col justify-center px-8 md:px-20 bg-white">
        <div class="max-w-4xl">
            <h1 class="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-slate-900">
                ${data.hero.headline}
            </h1>
            <p class="text-2xl md:text-3xl text-slate-500 mb-8 font-light">
                ${data.hero.subheadline}
            </p>
            <p class="text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
                ${data.hero.description}
            </p>
            <div class="flex gap-4">
                <a href="mailto:${data.contact.email}" class="bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition">
                    Contact Me
                </a>
                ${data.contact.github ? `<a href="https://${data.contact.github}" class="px-8 py-4 rounded-full border border-slate-200 hover:bg-slate-50 transition">GitHub</a>` : ''}
            </div>
        </div>
    </header>

    <!-- Experience -->
    <section class="py-24 px-8 md:px-20">
        <h2 class="text-3xl font-bold mb-16 border-b border-slate-200 pb-8">Experience</h2>
        <div class="space-y-16 max-w-4xl">
            ${data.experience.map(exp => `
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="text-slate-400 font-medium">${exp.duration}</div>
                <div class="md:col-span-3">
                    <h3 class="text-2xl font-bold mb-2">${exp.role}</h3>
                    <div class="text-slate-600 mb-4 font-medium">${exp.company}</div>
                    <p class="text-slate-600 leading-relaxed text-lg">
                        ${exp.description}
                    </p>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Projects -->
    <section class="py-24 px-8 md:px-20 bg-white">
        <h2 class="text-3xl font-bold mb-16 border-b border-slate-200 pb-8">Selected Work</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
            ${data.projects.map(proj => `
            <div class="group cursor-pointer">
                <div class="h-64 bg-slate-100 rounded-2xl mb-8 group-hover:bg-slate-200 transition"></div>
                <h3 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">${proj.title}</h3>
                <p class="text-slate-600 mb-4 text-lg">${proj.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${proj.tags.map(tag => `<span class="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-600">${tag}</span>`).join('')}
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-24 px-8 md:px-20 bg-slate-900 text-white">
        <div class="max-w-4xl">
            <h2 class="text-4xl font-bold mb-8">Let's build something together.</h2>
            <a href="mailto:${data.contact.email}" class="text-2xl text-slate-400 hover:text-white transition decoration-slice underline underline-offset-8">
                ${data.contact.email}
            </a>
        </div>
    </footer>

</body>
</html>
    `.trim();
};
