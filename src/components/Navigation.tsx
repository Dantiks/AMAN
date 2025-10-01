import React from 'react';
import ThemeToggle from './ThemeToggle';
import { User } from 'lucide-react';

interface NavigationProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
  onAdminClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentLang, onLangChange, onAdminClick }) => {
  return (
    <nav className="navigation">
      <div className="nav-blur-bg"></div>
      <div className="container">
        <div className="nav-content">
          <div className="nav-left">
            <div className="nav-ornament">
              <div className="ornament-dots"></div>
            </div>
          </div>

          <div className="nav-center">
            <div className="language-switcher">
              <div className="switcher-bg"></div>
              <button 
                className={`lang-btn ${currentLang === 'kg' ? 'active' : ''}`}
                onClick={() => onLangChange('kg')}
              >
                КЫР
                <div className="btn-ripple"></div>
              </button>
              <span className="separator pulse">|</span>
              <button 
                className={`lang-btn ${currentLang === 'ru' ? 'active' : ''}`}
                onClick={() => onLangChange('ru')}
              >
                РУС
                <div className="btn-ripple"></div>
              </button>
            </div>
          </div>

          <div className="nav-right">
            <ThemeToggle />
            {onAdminClick && (
              <button className="admin-btn" onClick={onAdminClick}>
                <User size={18} />
                <span>Админ</span>
              </button>
            )}
            <div className="nav-ornament">
              <div className="ornament-dots"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;