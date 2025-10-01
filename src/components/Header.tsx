import React from 'react';
import { User } from 'lucide-react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <p className="header-subtitle">Обнажая душу</p>
        
        <h1 className="main-title">
          Аман Токтогулов
        </h1>
        
        <p className="header-description">
          Кыргыз акыны жана жазуучусу. Анын чыгармалары кыргыз адабиятында терең из калтырган. 
          Ырлар, прозалар жана башка чыгармалар менен таанышыңыз.
        </p>
        
        <button className="gallery-button-primary">
          Чыгармаларды көрүү
        </button>
      </div>
    </header>
  );
};

export default Header;