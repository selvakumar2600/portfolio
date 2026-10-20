import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../styles/LoadingScreen.css';

const LOADER_MESSAGES = [
  'Initializing workspace',
  'Compiling components',
  'Curating projects',
  'Polishing pixels',
  'Almost ready',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const glowRef = useRef(null);

  // Deterministic particle layout so it doesn't reshuffle on re-render
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 100),
        size: (Math.random() * 2.4 + 1).toFixed(1),
        delay: (Math.random() * 4).toFixed(2),
        duration: (Math.random() * 4 + 4).toFixed(2),
      })),
    []
  );

  const message = LOADER_MESSAGES[
    Math.min(LOADER_MESSAGES.length - 1, Math.floor((progress / 100) * LOADER_MESSAGES.length))
  ];

  useEffect(() => {
    // Check session storage if user has already seen loader in this session
    const hasSeen = sessionStorage.getItem('hasSeenExecutiveLoader');
    if (hasSeen === 'true') {
      setShouldRender(false);
      if (onComplete) onComplete();
      return;
    }

    // Smooth 0 - 100% counter over ~1.8s
    const startTime = Date.now();
    const duration = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);

        // Hold for 300ms at 100% then fade out
        setTimeout(() => {
          setIsFadingOut(true);
          sessionStorage.setItem('hasSeenExecutiveLoader', 'true');

          setTimeout(() => {
            setShouldRender(false);
            if (onComplete) onComplete();
          }, 600); // 600ms fade duration
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Subtle pointer-reactive glow (desktop only, respects reduced motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (prefersReducedMotion || isTouch || !glowRef.current) return;

    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (glowRef.current) {
        glowRef.current.style.setProperty('--tilt-x', `${x * 18}px`);
        glowRef.current.style.setProperty('--tilt-y', `${y * 18}px`);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`pro-loader-overlay ${isFadingOut ? 'fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress}% complete`}
    >

      {/* Background Ambient Glow */}
      <div className="pro-loader-glow" ref={glowRef} />

      {/* Floating particle field */}
      <div className="pro-loader-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="pro-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="pro-loader-content">

        {/* Monogram Badge Circle with Orbital Ring */}
        <div className="pro-badge-wrapper">
          <div className="pro-orbital-ring" />
          <div className="pro-orbital-ring pro-orbital-ring--reverse" />
          <div className="pro-monogram-circle">
            <span className="pro-monogram-text">SK</span>
          </div>
        </div>

        {/* Developer Name & Role */}
        <h1 className="pro-loader-name">B Selvakumar</h1>
        <div className="pro-loader-role">FULL STACK DEVELOPER</div>

        {/* Sleek Glowing Progress Bar */}
        <div className="pro-progress-wrapper">
          <div
            className="pro-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="pro-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="pro-progress-meta">
            <span className="pro-progress-message">{message}</span>
            <span className="pro-progress-pct">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
