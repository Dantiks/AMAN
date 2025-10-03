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
    { id: 'biography', label: 'Өмүр баяны', path: '/section/biography' },
    { id: 'poetry', label: 'Ырлар', path: '/section/poetry' },
    { id: 'prose', label: 'Проза', path: '/section/prose' },
    { id: 'translations', label: 'Котормолор', path: '/section/translations' },
    { id: 'journalism', label: 'Публицистика', path: '/section/journalism' },
    { id: 'memoirs', label: 'Эскерүүлөр', path: '/section/memoirs' },
    { id: 'gallery', label: 'Фотогалерея', path: '/section/gallery' },
    { id: 'video', label: 'Видео', path: '/section/video' },
    { id: 'feedback', label: 'Ой-пикирлер', path: '/section/feedback' }
  ];

  return (
    <nav className="gallery-nav">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <span 
            className="logo-link"
            onDoubleClick={handleLogoDoubleClick}
            title="Двойной клик для админ-панели"
            style={{ cursor: 'pointer' }}
          >
            АМАН ТОКТОГУЛОВ
          </span>
        </div>

        <div className="nav-menu">
          {menuItems.map((item) => (
            <a 
              key={item.id}
              href={item.path}
              className="nav-menu-item"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default Navigation;