import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { ContentCard } from '../types';
import '../styles/CardDetail.css';

interface CardDetailProps {
  currentLang: string;
}

const CardDetail: React.FC<CardDetailProps> = ({ currentLang }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<ContentCard | null>(null);

  useEffect(() => {
    // Загрузка карточки из localStorage
    const savedCards = localStorage.getItem('contentCards');
    if (savedCards) {
      const cards: ContentCard[] = JSON.parse(savedCards);
      const foundCard = cards.find(c => c.id === id);
      if (foundCard) {
        setCard(foundCard);
      }
    }
  }, [id]);

  if (!card) {
    return (
      <div className="card-detail-container">
        <div className="container">
          <div className="not-found">
            <h2>{currentLang === 'kg' ? 'Карточка табылган жок' : 'Карточка не найдена'}</h2>
            <button className="back-button" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
              {currentLang === 'kg' ? 'Башкы бетке кайтуу' : 'Вернуться на главную'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const title = currentLang === 'kg' ? (card.titleKg || card.titleRu) : card.titleRu;
  const description = currentLang === 'kg' ? (card.descriptionKg || card.descriptionRu) : card.descriptionRu;
  const categoryNames: { [key: string]: { ru: string; kg: string } } = {
    poetry: { ru: 'Поэзия', kg: 'Ырлар' },
    prose: { ru: 'Проза', kg: 'Проза' },
    translations: { ru: 'Переводы', kg: 'Котормолор' },
    journalism: { ru: 'Публицистика', kg: 'Публицистика' },
    memoirs: { ru: 'Воспоминания', kg: 'Эскерүүлөр' },
    gallery: { ru: 'Фотогалерея', kg: 'Фотогалерея' },
    video: { ru: 'Видео', kg: 'Видео' }
  };

  const categoryName = categoryNames[card.category]?.[currentLang === 'kg' ? 'kg' : 'ru'] || card.category;

  return (
    <div className="card-detail-container">
      <div className="detail-bg-pattern"></div>
      
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          {currentLang === 'kg' ? 'Артка' : 'Назад'}
        </button>

        <div className="card-detail">
          {card.image && (
            <div className="detail-image-container">
              <img src={card.image} alt={title} className="detail-image" />
              <div className="image-overlay"></div>
            </div>
          )}

          <div className="detail-content">
            <div className="detail-header">
              <h1 className="detail-title">{title}</h1>
              
              <div className="detail-meta">
                <div className="meta-item">
                  <Tag size={18} />
                  <span>{categoryName}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={18} />
                  <span>{new Date(card.createdAt).toLocaleDateString(currentLang === 'kg' ? 'ky-KG' : 'ru-RU')}</span>
                </div>
              </div>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-description">
              <p>{description}</p>
            </div>

            {/* Дополнительный контент */}
            <div className="detail-extra">
              <div className="extra-section">
                <h3>{currentLang === 'kg' ? 'Кошумча маалымат' : 'Дополнительная информация'}</h3>
                <p>
                  {currentLang === 'kg' 
                    ? 'Бул материал жөнүндө толук маалымат жакында жарыяланат.'
                    : 'Полная информация об этом материале будет опубликована в ближайшее время.'
                  }
                </p>
              </div>
            </div>

            <div className="detail-actions">
              <button className="action-button primary" onClick={() => navigate('/')}>
                {currentLang === 'kg' ? 'Башкы бетке кайтуу' : 'Вернуться на главную'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
