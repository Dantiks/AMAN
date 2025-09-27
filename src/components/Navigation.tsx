import React from 'react';

interface NavigationProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
  onAdminClick?: () => void; // добавили новый проп (опционально)
}

const Navigation: React.FC<NavigationProps> = ({ currentLang, onLangChange, onAdminClick }) => {
  return (
    <nav className="navigation">
      <div className="nav-blur-bg"></div>
      <div className="container">
        <div className="nav-content">
          <div className="nav-ornament left">
            <div className="ornament-dots"></div>
          </div>

          <div className="language-switcher">
            <div className="switcher-bg"></div>
            <button 
              className={`lang-btn ${currentLang === 'ru' ? 'active' : ''}`}
              onClick={() => onLangChange('ru')}
            >
              РУС
              <div className="btn-ripple"></div>
            </button>
            <span className="separator pulse">|</span>
            <button 
              className={`lang-btn ${currentLang === 'kg' ? 'active' : ''}`}
              onClick={() => onLangChange('kg')}
            >
              КЫР
              <div className="btn-ripple"></div>
            </button>
          </div>

          {onAdminClick && (
            <button className="admin-btn" onClick={onAdminClick}>
              Админ
            </button>
          )}

          <div className="nav-ornament right">
            <div className="ornament-dots"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
