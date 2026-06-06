import { useState, useEffect, useRef } from 'react';
import { LandingPage } from './pages/LandingPage';
import { ReaderPage } from './pages/ReaderPage';
import { trackPageView, trackTime, clearUserData } from './utils/userTracking';
import './styles/landing.css';
import './styles/reader.css';
import './styles/app.css';

function App() {
  const [page, setPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#reader') return 'reader';
    }
    return 'landing';
  });

  const pageStartRef = useRef(0);

  useEffect(() => {
    pageStartRef.current = Date.now();
    trackPageView(page);

    const unloadHandler = () => {
      const seconds = Math.round((Date.now() - pageStartRef.current) / 1000);
      if (seconds > 0) {
        trackTime(seconds);
      }
    };
    window.addEventListener('beforeunload', unloadHandler);

    const hashHandler = () => {
      const now = Date.now();
      const seconds = Math.round((now - pageStartRef.current) / 1000);
      if (seconds > 0) {
        trackTime(seconds);
      }

      const raw = (window.location.hash || '#landing').replace('#', '');
      if (raw === 'reader') setPage('reader');
      else setPage('landing');
    };
    window.addEventListener('hashchange', hashHandler);

    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
      window.removeEventListener('hashchange', hashHandler);
    };
  }, [page]);

  const navigate = (to: 'landing' | 'reader') => {
    window.location.hash = to;
    setPage(to);
    trackPageView(to);
  };

  const handleClearData = () => {
    clearUserData();
    alert('User data cleared from cookie.');
  };

  if (page === 'reader') {
    return (
      <div className="app-shell">
        <nav className="top-nav glass">
          <div className="nav-inner">
            <a href="#landing" className="logo-sm" onClick={(e) => { e.preventDefault(); navigate('landing'); }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#ff3b3b" />
                <path d="M7 8v8l5.5-4L7 8z" fill="white" />
                <path d="M15 10v4h3v-4h-3z" fill="white" opacity="0.7" />
              </svg>
              <span>LongUnlimitedReader</span>
            </a>
            <div className="nav-actions-sm">
              <button className="reader-nav-btn" onClick={handleClearData}>Reset data</button>
            </div>
          </div>
        </nav>
        <ReaderPage />
      </div>
    );
  }

  return <LandingPage onStartReading={() => navigate('reader')} />;
}

export default App;
