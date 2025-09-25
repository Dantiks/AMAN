import React, { useState, useEffect } from 'react';
import { LoadingScreenProps } from '../types';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);
  const [showSurname, setShowSurname] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Create animated particles
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 1000);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    setTimeout(() => setShowName(true), 800);
    setTimeout(() => setShowSurname(true), 1600);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
      
      <div className="loading-content">
        <div className="vintage-frame">
          <div className="frame-glow"></div>
          <div className="name-container">
            <div className={`name-part ${showName ? 'animate-in' : ''}`}>
              <span className="first-name">Аман</span>
              <div className="name-underline"></div>
            </div>
            <div className={`name-part ${showSurname ? 'animate-in' : ''}`}>
              <span className="last-name">Токтогулов</span>
              <div className="name-underline"></div>
            </div>
          </div>
          <div className="loading-bar-container">
            <div className="loading-bar">
              <div className="loading-progress" style={{ width: `${progress}%` }}>
                <div className="progress-glow"></div>
              </div>
            </div>
            <div className="loading-text">{Math.round(progress)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;