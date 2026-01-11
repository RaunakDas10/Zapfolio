import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Processing } from './components/upload/Processing';
import { Builder } from './pages/Builder';
import { useStore } from './store/useStore';

function App() {
  const { resume, isDarkMode } = useStore();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col transition-colors duration-300">
        <Navbar />
        <div className="flex-1">
          {resume.status === 'idle' && <Landing />}
          {(resume.status === 'uploading' || resume.status === 'processing') && <Processing />}
          {resume.status === 'ready' && <Builder />}
        </div>
        {resume.status === 'idle' && <Footer />}
      </div>
    </div>
  );
}

export default App;
