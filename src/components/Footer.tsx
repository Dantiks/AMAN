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
              ? '© 2024 Литературное наследие Амана Токтогулова' 
              : '© 2024 Аман Токтогулов адабий мурасы'
            }
          </p>
          
          <p className="footer-developer" style={{ marginTop: '15px', opacity: 0.7, fontSize: '0.9rem' }}>
            {currentLang === 'ru' 
              ? 'Разработка сайта: Cascade AI & Windsurf' 
              : 'Сайтты иштеп чыккан: Cascade AI & Windsurf'
            }
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