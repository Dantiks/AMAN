import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Feather, BookOpen, Camera, Video, FileText, Heart, Globe } from 'lucide-react';
import { Section, ContentCard } from '../types';

interface MainContentProps {
  currentLang: string;
}

const MainContent: React.FC<MainContentProps> = ({ currentLang }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [contentCards, setContentCards] = useState<ContentCard[]>([]);
  const navigate = useNavigate();

  const sections: Section[] = [
    {
      id: 'poetry',
      titleRu: 'Поэзия',
      titleKg: 'Ырлар',
      icon: <Feather size={32} />,
      description: '6000 произведений за 24 года творчества'
    },
    {
      id: 'prose',
      titleRu: 'Проза',
      titleKg: 'Проза',
      icon: <BookOpen size={32} />,
      description: 'Рассказы и повести'
    },
    {
      id: 'translations',
      titleRu: 'Переводы',
      titleKg: 'Котормолор',
      icon: <Globe size={32} />,
      description: 'Переводы классических произведений'
    },
    {
      id: 'journalism',
      titleRu: 'Публицистика',
      titleKg: 'Публицистика',
      icon: <FileText size={32} />,
      description: 'Статьи и очерки'
    },
    {
      id: 'memoirs',
      titleRu: 'Воспоминания',
      titleKg: 'Эскерүүлөр',
      icon: <Heart size={32} />,
      description: 'Личные воспоминания и размышления'
    },
    {
      id: 'gallery',
      titleRu: 'Фотогалерея',
      titleKg: 'Фотогалерея',
      icon: <Camera size={32} />,
      description: 'Фотографии из жизни поэта'
    },
    {
      id: 'video',
      titleRu: 'Видео',
      titleKg: 'Видео',
      icon: <Video size={32} />,
      description: 'Видеоматериалы и интервью'
    }
  ];

  // Загрузка карточек из localStorage
  useEffect(() => {
    const loadCards = () => {
      const savedCards = localStorage.getItem('contentCards');
      if (savedCards) {
        setContentCards(JSON.parse(savedCards));
      }
    };

    loadCards();

    // Слушаем обновления из админки
    const handleCardsUpdate = () => {
      loadCards();
    };

    window.addEventListener('cardsUpdated', handleCardsUpdate);

    return () => {
      window.removeEventListener('cardsUpdated', handleCardsUpdate);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [contentCards]);

  return (
    <main className="main-content">
      <div className="content-bg-pattern"></div>
      
      <div className="container">
        <div className="hero-section" ref={heroRef}>
          <div className="vintage-card large hero-card">
            <div className="card-glow"></div>
            <div className="card-ornament animated"></div>
            
            <div className="stats-container">
              <div className="stat-item appear-1">
                <div className="stat-number counter" data-target="6000">0</div>
                <div className="stat-label">
                  {currentLang === 'ru' ? 'произведений' : 'чыгарма'}
                </div>
              </div>
              
              <div className="stat-divider"></div>
              
              <div className="stat-item appear-2">
                <div className="stat-number counter" data-target="24">0</div>
                <div className="stat-label">
                  {currentLang === 'ru' ? 'года творчества' : 'жыл чыгармачылык'}
                </div>
              </div>
              
              <div className="stat-divider"></div>
              
              <div className="stat-item appear-3">
                <div className="stat-number counter" data-target="10">0</div>
                <div className="stat-label">
                  {currentLang === 'ru' ? 'книг издано' : 'китеп басылган'}
                </div>
              </div>
            </div>
            
            <div className="card-ornament bottom animated"></div>
          </div>
        </div>

        <div className="sections-grid" ref={sectionsRef}>
          {sections.map((section, index) => (
            <div 
              key={section.id} 
              className="vintage-card section-card"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="card-hover-glow"></div>
              <div className="card-header">
                <div className="section-icon icon-bounce">
                  {section.icon}
                  <div className="icon-bg-glow"></div>
                </div>
                <h3 className="section-title">
                  {currentLang === 'ru' ? section.titleRu : section.titleKg}
                </h3>
              </div>
              
              <div className="card-divider animated-line"></div>
              
              <p className="section-description">
                {section.description}
              </p>
              
              <div className="card-footer">
                <button 
                  className="vintage-button hover-lift"
                  onClick={() => navigate(`/section/${section.id}`)}
                >
                  <span>{currentLang === 'ru' ? 'Читать' : 'Окуу'}</span>
                  <div className="button-glow"></div>
                  <div className="button-particles"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="quotes-section">
          <div className="vintage-card quote-card floating">
            <div className="quote-bg-pattern"></div>
            <div className="quote-ornament rotating">
              <div className="quote-symbol">"</div>
            </div>
            
            <blockquote className="main-quote">
              <p className="quote-text typing-effect">
                {currentLang === 'ru' 
                  ? 'Поэзия — это душа народа, выраженная в слове' 
                  : 'Поэзия — бул сөз менен берилген эл жаны'
                }
              </p>
            </blockquote>
            
            <div className="quote-author slide-up">— Аман Токтогулов</div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default MainContent;