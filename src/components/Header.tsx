import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
      <div className="header-bg-pattern"></div>
      <div className="header-shadows"></div>
      
      <div className="container">
        <div className="header-ornament top">
          <div className="ornament-line"></div>
          <div className="ornament-diamond"></div>
          <div className="ornament-line"></div>
        </div>
        
        <div className="header-content">
          <h1 className="main-title">
            <span className="title-line floating">
              Аман Токтогулов
              <div className="title-glow"></div>
            </span>
            <span className="subtitle typing">Кыргыз жазуучусу жана акыны</span>
          </h1>
          
          <div className="portrait-frame rotating-border">
            <div className="portrait-placeholder pulse">
              <User size={80} />
              <div className="portrait-glow"></div>
            </div>
          </div>
        </div>
        
        <div className="header-ornament bottom">
          <div className="ornament-line"></div>
          <div className="ornament-diamond"></div>
          <div className="ornament-line"></div>
        </div>
      </div>
    </header>
  );
};

export default Header; 