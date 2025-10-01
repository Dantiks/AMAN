import React from 'react';
import ThemeToggle from './ThemeToggle';
import BurgerMenu from './BurgerMenu';
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

  const sections = [
    { id: 'poetry', titleKg: 'Ырлар' },
    { id: 'prose', titleKg: 'Проза' },
    { id: 'translations', titleKg: 'Котормолор' },
    { id: 'journalism', titleKg: 'Публицистика' },
    { id: 'memoirs', titleKg: 'Эскерүүлөр' },
    { id: 'gallery', titleKg: 'Фотогалерея' },
    { id: 'video', titleKg: 'Видео' },
    { id: 'biography', titleKg: 'Өмүр баяны' },
    { id: 'feedback', titleKg: 'Ой-пикирлер' }
  ];

  const menuItems = [
    { id: 'biography', label: 'Өмүр баяны' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'video', label: 'Видео' },
    { id: 'poetry', label: 'Ырлар' },
    { id: 'feedback', label: 'Байланыш' }
  ];

  return (
    <nav className="gallery-nav">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <a 
            href="/" 
            className="logo-link"
            onDoubleClick={handleLogoDoubleClick}
            title="Двойной клик для админ-панели"
          >
            АМАН ТОКТОГУЛОВ
          </a>
        </div>

        <div className="nav-menu">
          {menuItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className="nav-menu-item"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
export default Navigation;