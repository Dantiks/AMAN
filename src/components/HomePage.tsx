import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

interface HomePageProps {
  currentLang: string;
}

const HomePage: React.FC<HomePageProps> = ({ currentLang }) => {
  return (
    <>
      <Header />
      <MainContent currentLang={currentLang} />
      <Footer currentLang={currentLang} />
    </>
  );
};

export default HomePage;
