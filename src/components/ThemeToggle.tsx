import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import '../styles/ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Загрузка темы из localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // По умолчанию светлая тема
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Караңгы темага өтүү' : 'Жарык темага өтүү'}
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
