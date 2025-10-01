import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="header-bg-pattern"></div>
      <div className="header-shadows"></div>
      
      <div className="container">
        <div className="header-ornament top">
          <div className="ornament-line"></div>
          <div className="ornament-diamond"></div>
          <div className="ornament-line"></div>
        </div>
        
        <div className="header-content">
          <div className="portrait-frame">
            <div className="portrait-placeholder">
              <User size={60} />
            </div>
            <div className="portrait-glow"></div>
          </div>
          
          <h1 className="main-title">
            <span className="title-line">
              Аман Токтогулов
              <div className="title-glow"></div>
            </span>
            <span className="subtitle">Кыргыз жазуучусу жана акыны</span>
          </h1>
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