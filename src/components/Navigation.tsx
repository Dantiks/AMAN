import React from 'react';
import ThemeToggle from './ThemeToggle';
import { User } from 'lucide-react';

interface NavigationProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
  onAdminClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentLang, onLangChange, onAdminClick }) => {
  const handleLogoDoubleClick = () => {
    if (onAdminClick) {
      onAdminClick();
    }
  };

  return (
    <nav className="gallery-nav">
      <div className="container">
        <div className="nav-wrapper">
          <div className="nav-logo">
            <a 
              href="/" 
              className="logo-link"
              onDoubleClick={handleLogoDoubleClick}
              title="Двойной клик для админ-панели"
            >
              Аман Токтогулов
            </a>
          </div>

          <div className="nav-menu">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;