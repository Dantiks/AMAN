import React from 'react';
import { User } from 'lucide-react';
import '../styles/Header.css';

const Header: React.FC = () => {
  const scrollToSections = () => {
    const sectionsElement = document.querySelector('.sections-grid');
    if (sectionsElement) {
      sectionsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-photo">
          <img 
            src="/images/aman-toktogul.jpg" 
            alt="Аман Токтогулов" 
            className="author-photo"
          />
        </div>
        
        <h1 className="main-title">
          Аман Токтогулов
        </h1>
        
        <p className="header-subtitle">
          Кыргыз акыны жана жазуучусу
        </p>
      </div>
    </header>
  );
};

export default Header;