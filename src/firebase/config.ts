import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase конфигурация
// ВАЖНО: Замените эти значения на свои из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC5qL28paLUsUicZEuobdJ8uAi5mVYSyKw",
  authDomain: "aman-toktogul-site.firebaseapp.com",
  databaseURL: "https://aman-toktogul-site-default-rtdb.firebaseio.com",
  projectId: "aman-toktogul-site",
  storageBucket: "aman-toktogul-site.firebasestorage.app",
  messagingSenderId: "941939275801",
  appId: "1:941939275801:web:269d8aa2c24c80de071288",
  measurementId: "G-TVF1S3KQRY"
  };

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
