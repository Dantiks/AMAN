import React from 'react';
import { User } from 'lucide-react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-bg-pattern"></div>
      <div className="header-shadows"></div>
      
      <div className="container">
          <div className="ornament-line"></div>
          <div className="ornament-diamond"></div>
          <div className="ornament-line"></div>
        </div>
        
        <div className="container">
        <div className="header-content">
          <div className="main-title vertical-title">
            <span className="title-line vertical-text">
              АМАН ТОКТОГУЛОВ
            </span>
          </div>
          
          <p className="subtitle">
            Кыргыз акыны жана жазуучусу
          </p>
        </div>
        
        <div className="header-ornament bottom">
          <div className="ornament-line"></div>
          <div className="ornament-diamond"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;