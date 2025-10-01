import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../styles/BurgerMenu.css';

interface BurgerMenuProps {
  sections: Array<{
    id: string;
    titleKg: string;
  }>;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSectionClick = (sectionId: string) => {
    navigate(`/section/${sectionId}`);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className="burger-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Меню"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="burger-overlay" onClick={() => setIsOpen(false)}>
          <div className="burger-menu" onClick={(e) => e.stopPropagation()}>
            <div className="burger-header">
              <h2>Бөлүмдөр</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <nav className="burger-nav">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className="burger-nav-item"
                  onClick={() => handleSectionClick(section.id)}
                >
                  {section.titleKg}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
