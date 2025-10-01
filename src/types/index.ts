export interface Section {
  id: string;
  titleRu: string;
  titleKg: string;
  icon: React.ReactNode;
  description: string;
}

export interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export interface ContentCard {
  id: string;
  titleRu: string;
  titleKg: string;
  descriptionRu: string;
  descriptionKg: string;
  image?: string; // base64 или URL
  category: string; // 'poetry' | 'prose' | 'translations' | 'journalism' | 'memoirs' | 'gallery' | 'video'
  createdAt: number;
  updatedAt: number;
}