import { useState, useEffect } from 'react';
import { ContentCard } from '../types';
import { getAllCards, addCard, updateCard, deleteCard, uploadImage } from '../firebase/cardService';

export const useFirebaseCards = () => {
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка карточек при монтировании
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const fetchedCards = await getAllCards();
      setCards(fetchedCards);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки карточек');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCard = async (cardData: Omit<ContentCard, 'id' | 'createdAt' | 'updatedAt'>, imageFile?: File) => {
    try {
      // Сначала создаем карточку
      const cardId = await addCard(cardData);
      
      // Если есть изображение, загружаем его
      let imageUrl = cardData.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, cardId);
        // Обновляем карточку с URL изображения
        await updateCard(cardId, { image: imageUrl });
      }
      
      // Перезагружаем карточки
      await loadCards();
      return cardId;
    } catch (err) {
      setError('Ошибка создания карточки');
      console.error(err);
      throw err;
    }
  };

  const modifyCard = async (cardId: string, cardData: Partial<ContentCard>, imageFile?: File) => {
    try {
      let imageUrl = cardData.image;
      
      // Если есть новое изображение, загружаем его
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, cardId);
        cardData.image = imageUrl;
      }
      
      await updateCard(cardId, cardData);
      await loadCards();
    } catch (err) {
      setError('Ошибка обновления карточки');
      console.error(err);
      throw err;
    }
  };

  const removeCard = async (cardId: string, imageUrl?: string) => {
    try {
      await deleteCard(cardId, imageUrl);
      await loadCards();
    } catch (err) {
      setError('Ошибка удаления карточки');
      console.error(err);
      throw err;
    }
  };

  return {
    cards,
    loading,
    error,
    loadCards,
    createCard,
    modifyCard,
    removeCard
  };
};
