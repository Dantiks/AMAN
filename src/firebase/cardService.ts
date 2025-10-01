import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';
import { ContentCard } from '../types';

const CARDS_COLLECTION = 'contentCards';

// Загрузка изображения в Firebase Storage
export const uploadImage = async (file: File, cardId: string): Promise<string> => {
  try {
    const storageRef = ref(storage, `cards/${cardId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error);
    throw error;
  }
};

// Удаление изображения из Firebase Storage
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Ошибка удаления изображения:', error);
  }
};

// Получение всех карточек
export const getAllCards = async (): Promise<ContentCard[]> => {
  try {
    const cardsQuery = query(
      collection(db, CARDS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(cardsQuery);
    
    const cards: ContentCard[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      cards.push({
        id: doc.id,
        titleRu: data.titleRu,
        titleKg: data.titleKg,
        descriptionRu: data.descriptionRu,
        descriptionKg: data.descriptionKg,
        image: data.image,
        category: data.category,
        createdAt: data.createdAt?.toMillis() || Date.now(),
        updatedAt: data.updatedAt?.toMillis() || Date.now()
      });
    });
    
    return cards;
  } catch (error) {
    console.error('Ошибка получения карточек:', error);
    return [];
  }
};

// Добавление новой карточки
export const addCard = async (cardData: Omit<ContentCard, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, CARDS_COLLECTION), {
      ...cardData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Ошибка добавления карточки:', error);
    throw error;
  }
};

// Обновление карточки
export const updateCard = async (cardId: string, cardData: Partial<ContentCard>): Promise<void> => {
  try {
    const cardRef = doc(db, CARDS_COLLECTION, cardId);
    await updateDoc(cardRef, {
      ...cardData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Ошибка обновления карточки:', error);
    throw error;
  }
};

// Удаление карточки
export const deleteCard = async (cardId: string, imageUrl?: string): Promise<void> => {
  try {
    // Удаляем изображение если есть
    if (imageUrl) {
      await deleteImage(imageUrl);
    }
    
    // Удаляем карточку
    const cardRef = doc(db, CARDS_COLLECTION, cardId);
    await deleteDoc(cardRef);
  } catch (error) {
    console.error('Ошибка удаления карточки:', error);
    throw error;
  }
};
