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