import { useState } from 'react';
import './../styles/landing.css';

const features = [
  {
    title: 'Unlimited Text',
    description: 'Paste chapters, articles, or entire books. No character limits — read as much as you want.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    title: 'Natural Voices',
    description: 'Choose from a growing library of lifelike voices. Male, female, kid — find the perfect tone.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Pitch & Speed Control',
    description: 'Fine-tune playback speed and voice pitch to match your preferred listening style.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="4" y1="21" y2="14" />
        <line x1="4" x2="4" y1="10" y2="3" />
        <line x1="12" x2="12" y1="21" y2="12" />
        <line x1="12" x2="12" y1="8" y2="3" />
        <line x1="20" x2="20" y1="21" y2="16" />
        <line x1="20" x2="20" y1="12" y2="3" />
        <line x1="2" x2="6" y1="14" y2="14" />
        <line x1="10" x2="14" y1="12" y2="12" />
        <line x1="18" x2="22" y1="16" y2="16" />
      </svg>
    ),
  },
  {
    title: 'Instant Playback',
    description: 'No waiting for render queues. Hear your text instantly powered by the browser.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Privacy Focused',
    description: 'Your text never leaves your device. All processing happens locally in your browser.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Export Ready',
    description: 'Download your generated audio as high-quality WAV or MP3 for offline listening.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    ),
  },
];

const steps = [
  { title: 'Paste Text', description: 'Drop in any article, chapter, or long-form content into the editor.' },
  { title: 'Choose Voice', description: 'Browse available voices and pick one that fits the mood of the text.' },
  { title: 'Adjust Settings', description: 'Set speed, pitch, and volume to your liking with intuitive sliders.' },
  { title: 'Listen & Enjoy', description: 'Hit play and enjoy a seamless read-aloud experience anywhere.' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer @ Linear',
    content: 'LongUnlimitedReader replaced three different apps for me. The voice quality is surprisingly good for being 100% local.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Reid',
    role: 'Technical Writer @ Vercel',
    content: 'I consume documentation faster by listening while I code. This tool is my secret weapon.',
    avatar: 'MR',
  },
  {
    name: 'Aisha Patel',
    role: 'Graduate Student',
    content: 'I paste entire research papers and listen during my commute. The unlimited text support is a game changer.',
    avatar: 'AP',
  },
];

const faqs = [
  {
    question: 'Is LongUnlimitedReader really free?',
    answer: 'Yes. The core reading experience is free forever and runs entirely in your browser with no account required.',
  },
  {
    question: 'What voices are available?',
    answer: 'We use your operating system\'s built-in speech synthesis voices, so availability depends on your device. Windows, Mac, Android, and iOS all provide high-quality options.',
  },
  {
    question: 'Can I export audio files?',
    answer: 'Yes. You can export WAV files for offline listening.',
  },
  {
    question: 'Does it work offline?',
    answer: 'Yes. Once loaded, the app works offline. Your text and settings are cached locally.',
  },
  {
    question: 'How do I get support?',
    answer: 'Support is available via GitHub Discussions.',
  },
];

export function LandingPage({ onStartReading }: { onStartReading?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="landing">
      <nav className="nav glass">
        <div className="nav-inner">
          <a href="#landing" className="logo" onClick={(e) => { e.preventDefault(); window.location.hash = 'landing'; }}>
            <span className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="#ff3b3b" />
                <path d="M7 8v8l5.5-4L7 8z" fill="white" />
                <path d="M15 10v4h3v-4h-3z" fill="white" opacity="0.7" />
              </svg>
            </span>
            <span className="logo-text">LongUnlimitedReader</span>
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-actions">
            <button className="btn-primary" onClick={onStartReading}>Open Reader</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>v2.0 — Now with cloud voices</span>
            </div>
            <h1 className="hero-title">
              Read anything,<br />
              <span className="gradient-text">out loud</span>, forever.
            </h1>
            <p className="hero-subtitle">
              Paste unlimited text and listen with natural, lifelike voices. No limits. No uploads. Built for readers, listeners, and builders.
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-lg" onClick={onStartReading}>Open Reader</button>
            </div>
            <div className="hero-social">
              <span>Trusted by teams at</span>
              <div className="hero-logos">
                <span className="logo-pill">Stripe</span>
                <span className="logo-pill">Linear</span>
                <span className="logo-pill">Vercel</span>
                <span className="logo-pill">Notion</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mockup glass">
              <div className="mockup-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="mockup-body">
                <div className="mockup-waves">
                  {(() => {
                    const heights = Array.from({ length: 28 }, () => `${30 + Math.random() * 70}%`);
                    return heights.map((h, i) => (
                      <span key={i} className="bar" style={{ height: h }} />
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2 className="section-title">Everything you need to listen smarter</h2>
          <p className="section-subtitle">Built for speed, privacy, and delight. No bloat, no nonsense.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card glass" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-inner">
          <div className="about-text">
            <span className="section-tag">About</span>
            <h2 className="section-title">Reading shouldn't be limited</h2>
            <p>
              We believe text-to-speech should be as frictionless as reading itself. LongUnlimitedReader was born from the frustration of hitting character limits, dealing with slow cloud queues, and paying for features that should be free.
            </p>
            <p>
              Our mission is simple: remove every barrier between you and the content you want to consume. Whether you're commuting, exercising, or resting your eyes — your next chapter is one click away.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-value">0</span>
                <span className="stat-label">Character limits</span>
              </div>
              <div className="stat">
                <span className="stat-value">100%</span>
                <span className="stat-label">Privacy focused</span>
              </div>
              <div className="stat">
                <span className="stat-value">∞</span>
                <span className="stat-label">Listening hours</span>
              </div>
            </div>
          </div>
          <div className="about-visual glass">
            <div className="about-card-stack">
              <div className="about-card" />
              <div className="about-card" />
              <div className="about-card" />
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-inner">
          <div className="stat-item">
            <span className="stat-value">2M+</span>
            <span className="stat-label">Words read daily</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">180+</span>
            <span className="stat-label">Countries served</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4.9/5</span>
            <span className="stat-label">Avg. rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">&lt;50ms</span>
            <span className="stat-label">Avg. start latency</span>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-header">
          <span className="section-tag">How it works</span>
          <h2 className="section-title">Four steps to your next listen</h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Loved by readers worldwide</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial glass" key={i}>
              <p className="testimonial-content">"{t.content}"</p>
              <div className="testimonial-author">
                <span className="avatar">{t.avatar}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq">
        <div className="section-header">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div className="faq-item" key={i}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{item.question}</span>
                <span className={`chevron ${openFaq === i ? 'open' : ''}`}>▾</span>
              </button>
              <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card glass">
          <h2>Ready to listen without limits?</h2>
          <p>Join thousands of readers who have switched to unlimited, privacy-first text-to-speech.</p>
          <button className="btn-primary btn-lg" onClick={onStartReading}>Open Reader</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#ff3b3b" />
                  <path d="M7 8v8l5.5-4L7 8z" fill="white" />
                  <path d="M15 10v4h3v-4h-3z" fill="white" opacity="0.7" />
                </svg>
              </span>
              <span className="logo-text">LongUnlimitedReader</span>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#faq">FAQ</a>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 LongUnlimitedReader. All rights reserved.</span>
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16H20L8.267 4H4z" />
                  <path d="M4 20l6.768-6.768" />
                  <path d="M20 4l-6.768 6.768" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.183 0 0 1.007-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.659.242 2.88.118 3.183.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
