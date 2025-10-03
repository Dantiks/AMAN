import React from 'react';

interface FooterProps {
  currentLang: string;
}

const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  return (
    <footer className="footer">
      <div className="footer-pattern"></div>
      <div className="container">
        <div className="footer-ornament expanding">
          <div className="ornament-center"></div>
        </div>
        
        <div className="footer-content">
          <p className="footer-text fade-in">
            {currentLang === 'ru' 
              ? '© 2025 Литературное наследие Амана Токтогулова' 
              : '© 2025 Аман Токтогулов адабий мурасы'
            }
          </p>
          
          <p className="footer-developer" style={{ marginTop: '15px', fontSize: '0.9rem', color: '#6b5d52' }}>
            Разработчик: Даниял Аманов
          </p>
          
          <p className="footer-contacts" style={{ marginTop: '8px', fontSize: '0.85rem', color: '#9b8d82' }}>
            <a href="mailto:danielamanov28@gmail.com" style={{ color: '#6b5d52', textDecoration: 'none' }}>
              danielamanov28@gmail.com
            </a>
            {' | '}
            <a href="tel:+996556786186" style={{ color: '#6b5d52', textDecoration: 'none' }}>
              +996 556 786 186
            </a>
          </p>
          
          <div className="footer-decoration">
            <div className="decoration-element pulse-glow"></div>
            <div className="decoration-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="decoration-element pulse-glow"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 