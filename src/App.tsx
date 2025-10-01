import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import CardDetail from './components/CardDetail';
import SectionDetail from './components/SectionDetail';
import AdminPanel from './components/AdminPanel';
import './styles/themes.css';
import './App.css';



const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLang] = useState('kg'); // Только кыргызский язык
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleLanguageChange = () => {
    // Язык всегда кыргызский
  };

  const handleAdminClick = () => {
    setShowAdmin(true);
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
  };

  useEffect(() => {
    // Counter animation for stats
    const animateCounter = (element: HTMLElement, target: number) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target.toString();
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current).toString();
        }
      }, 30);
    };

    if (!isLoading) {
      setTimeout(() => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach((counter) => {
          const target = parseInt((counter as HTMLElement).dataset.target || '0');
          animateCounter(counter as HTMLElement, target);
        });
      }, 1000);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="app">
        <Navigation currentLang={currentLang} onLangChange={handleLanguageChange} onAdminClick={handleAdminClick} />
        
        <Routes>
          <Route path="/" element={<HomePage currentLang={currentLang} />} />
          <Route path="/card/:id" element={<CardDetail currentLang={currentLang} />} />
          <Route path="/section/:id" element={<SectionDetail currentLang={currentLang} />} />
        </Routes>
        
        {showAdmin && (
          <AdminPanel onClose={handleCloseAdmin} currentLang={currentLang} />
        )}
      
      <style jsx>{`
        /* ============================================ */
        /* GLOBAL STYLES & RESET */
        /* ============================================ */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Times New Roman', serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
          color: #ffffff;
          line-height: 1.6;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          position: relative;
          opacity: 0;
          animation: fadeIn 1.5s ease-in forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        /* ============================================ */
        /* LOADING SCREEN STYLES */
        /* ============================================ */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow: hidden;
        }

        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #ffffff;
          border-radius: 50%;
          animation: float 3s ease-in-out infinite;
          opacity: 0.7;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }

        .loading-content {
          text-align: center;
          color: #ffffff;
          position: relative;
          z-index: 10;
        }

        .vintage-frame {
          border: 3px solid #ffffff;
          border-radius: 20px;
          padding: 50px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          box-shadow: 
            0 0 30px rgba(255, 255, 255, 0.3),
            inset 0 0 30px rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .frame-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ffffff, transparent, #ffffff);
          border-radius: 20px;
          opacity: 0.5;
          animation: rotate 4s linear infinite;
          z-index: -1;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .name-container {
          margin-bottom: 40px;
        }

        .name-part {
          margin: 15px 0;
          opacity: 0;
          transform: translateY(50px) scale(0.8);
          transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .name-part.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .first-name, .last-name {
          display: block;
          font-size: clamp(1.5rem, 5vw, 3rem);
          font-weight: bold;
          letter-spacing: clamp(2px, 0.3vw, 4px);
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          position: relative;
        }

        .name-underline {
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          margin: 10px auto 0;
          width: 0;
          animation: expandLine 1s ease-out 0.5s forwards;
        }

        @keyframes expandLine {
          to { width: 80%; }
        }

        .loading-bar-container {
          margin-top: 30px;
        }

        .loading-bar {
          width: 90%;
          max-width: 350px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
          margin: 0 auto;
          position: relative;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #ffffff 0%, #cccccc 50%, #ffffff 100%);
          border-radius: 3px;
          transition: width 0.3s ease;
          position: relative;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }

        .progress-glow {
          position: absolute;
          top: -2px;
          right: -5px;
          width: 10px;
          height: 10px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 20px #ffffff;
          animation: pulse 1s ease-in-out infinite;
        }

        .loading-text {
          margin-top: 20px;
          font-size: 1.4rem;
          color: #ffffff;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        /* ============================================ */
        /* HEADER STYLES */
        /* ============================================ */
        .header {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
          color: #ffffff;
          padding: 60px 0;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .header-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
          animation: drift 20s ease-in-out infinite;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -10px) rotate(1deg); }
        }

        .header-shadows {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 30%, rgba(0, 0, 0, 0.3) 70%),
            linear-gradient(-45deg, rgba(0, 0, 0, 0.2) 30%, transparent 70%);
        }

        .header-content {
          text-align: center;
          position: relative;
          z-index: 3;
        }

        .main-title {
          margin-bottom: 40px;
        }

        .title-line {
          display: block;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          letter-spacing: clamp(1px, 0.5vw, 3px);
          position: relative;
        }

        .title-line.floating {
          animation: float 4s ease-in-out infinite;
        }

        .title-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shine 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes shine {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        .subtitle {
          display: block;
          font-size: 1.6rem;
          font-style: italic;
          opacity: 0.9;
          letter-spacing: 2px;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #ffffff;
          animation: typing 3s steps(30) 1s forwards, blink 1s infinite step-end;
          width: 0;
        }

        .subtitle.typing {
          width: 100%;
        }

        @keyframes typing {
          0% { width: 0; }
          100% { width: 100%; }
        }

        @keyframes blink {
          0%, 50% { border-color: #ffffff; }
          51%, 100% { border-color: transparent; }
        }

        .portrait-frame {
          width: 180px;
          height: 180px;
          margin: 40px auto;
          border: 4px solid #ffffff;
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .portrait-frame.rotating-border::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: conic-gradient(#ffffff, transparent, #ffffff);
          border-radius: 50%;
          animation: rotate 3s linear infinite;
          z-index: -1;
        }

        .portrait-placeholder {
          color: #ffffff;
          opacity: 0.8;
          position: relative;
          z-index: 2;
        }

        .portrait-placeholder.pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .portrait-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: pulse 3s ease-in-out infinite;
          z-index: 1;
        }

        .header-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px 0;
        }

        .ornament-line {
          height: 2px;
          width: 100px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          animation: expandOrnament 2s ease-out;
        }

        .ornament-diamond {
          width: 10px;
          height: 10px;
          background: #ffffff;
          transform: rotate(45deg);
          margin: 0 20px;
          animation: rotateDiamond 4s ease-in-out infinite;
        }

        @keyframes expandOrnament {
          0% { width: 0; }
          100% { width: 100px; }
        }

        @keyframes rotateDiamond {
          0%, 100% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(225deg) scale(1.2); }
        }

        /* ============================================ */
        /* NAVIGATION STYLES */
        /* ============================================ */
        .navigation {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(15px);
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-blur-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            transparent 100%);
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .nav-content {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .language-switcher {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        .switcher-bg {
          position: absolute;
          top: -10px;
          left: -30px;
          right: -30px;
          bottom: -10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lang-btn {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 8px;
          font-family: inherit;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .lang-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
          border-color: #ffffff;
        }

        .lang-btn.active {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          transform: scale(1.05);
        }

        .btn-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s;
        }

        .lang-btn:active .btn-ripple {
          width: 100px;
          height: 100px;
        }

        .separator {
          color: #ffffff;
          font-size: 1.4rem;
          font-weight: bold;
          animation: pulse 2s ease-in-out infinite;
        }

        .nav-ornament {
          position: relative;
        }

        .ornament-dots {
          display: flex;
          gap: 8px;
        }

        .ornament-dots::before,
        .ornament-dots::after {
          content: '';
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite alternate;
        }

        .ornament-dots::after {
          animation-delay: 0.5s;
        }

        @keyframes dotPulse {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        .admin-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-left: 20px;
          transition: all 0.3s ease;
        }

        .admin-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        /* ============================================ */
        /* MAIN CONTENT STYLES */
        /* ============================================ */
        .main-content {
          padding: 80px 0;
          position: relative;
        }

        .content-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
          animation: drift 25s ease-in-out infinite reverse;
        }

        .hero-section {
          margin-bottom: 80px;
          text-align: center;
        }

        .vintage-card {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            rgba(0, 0, 0, 0.1) 100%);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
        }

        .vintage-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 30px rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .vintage-card.large {
          padding: 60px;
          margin-bottom: 50px;
        }

        .hero-card {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .card-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            rgba(255, 255, 255, 0.1), 
            transparent, 
            rgba(255, 255, 255, 0.1));
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: cardGlow 4s ease-in-out infinite;
          z-index: -1;
        }

        .vintage-card:hover .card-glow {
          opacity: 1;
        }

        @keyframes cardGlow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        .stats-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          animation: statAppear 1s ease-out forwards;
        }

        .stat-item.appear-1 { animation-delay: 0.5s; }
        .stat-item.appear-2 { animation-delay: 1s; }
        .stat-item.appear-3 { animation-delay: 1.5s; }

        @keyframes statAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-number {
          font-size: clamp(1.8rem, 7vw, 3.5rem);
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          display: block;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-divider {
          width: 2px;
          height: 60px;
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(255, 255, 255, 0.5), 
            transparent);
        }

        .card-ornament {
          height: 3px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.8) 50%, 
            transparent 100%);
          margin: 0 auto 30px;
          width: 150px;
          position: relative;
        }

        .card-ornament.animated {
          animation: expandOrnament 2s ease-out, pulse 3s ease-in-out 2s infinite;
        }

        .card-ornament.bottom {
          margin: 30px auto 0;
        }

        /* ============================================ */
        /* SECTIONS GRID STYLES */
        /* ============================================ */
        .sections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .section-card {
          opacity: 0;
          transform: translateY(50px) rotateX(10deg);
          animation: cardSlideUp 0.8s ease-out forwards;
          perspective: 1000px;
        }

        .section-card:hover {
          transform: translateY(-15px) rotateX(0deg) scale(1.03);
        }

        @keyframes cardSlideUp {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .card-hover-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, 
            rgba(255, 255, 255, 0.1) 0%, 
            transparent 70%);
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .section-card:hover .card-hover-glow {
          opacity: 1;
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
        }

        .section-icon {
          color: #ffffff;
          margin-right: 20px;
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.2), 
            rgba(255, 255, 255, 0.05));
          padding: 15px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          transition: all 0.3s ease;
        }

        .section-icon.icon-bounce:hover {
          animation: iconBounce 0.6s ease-in-out;
          transform: scale(1.1);
        }

        @keyframes iconBounce {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.3) rotate(5deg); }
        }

        .icon-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .section-icon:hover .icon-bg-glow {
          opacity: 1;
        }

        .section-title {
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .card-divider {
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.6) 50%, 
            transparent 100%);
          margin: 20px 0;
          position: relative;
          overflow: hidden;
        }

        .card-divider.animated-line::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.8), 
            transparent);
          animation: slideLine 3s ease-in-out infinite;
        }

        @keyframes slideLine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }

        .section-description {
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          margin-bottom: 25px;
          line-height: 1.7;
          text-align: left;
        }

        .card-footer {
          text-align: center;
        }

        .vintage-button {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.2) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 15px 30px;
          border-radius: 10px;
          font-family: inherit;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .vintage-button.hover-lift:hover {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.3) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border-color: #ffffff;
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent);
          transition: left 0.5s ease;
        }

        .vintage-button:hover .button-glow {
          left: 100%;
        }

        .button-particles {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .vintage-button:hover .button-particles::before,
        .vintage-button:hover .button-particles::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffffff;
          border-radius: 50%;
          animation: particles 1s ease-out;
        }

        .vintage-button:hover .button-particles::before {
          top: 20%;
          left: 20%;
          animation-delay: 0.1s;
        }

        .vintage-button:hover .button-particles::after {
          bottom: 20%;
          right: 20%;
          animation-delay: 0.3s;
        }

        @keyframes particles {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(180deg); opacity: 0; }
        }

        /* ============================================ */
        /* QUOTES SECTION STYLES */
        /* ============================================ */
        .quotes-section {
          margin-bottom: 80px;
        }

        .quote-card {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.12) 0%, 
            rgba(255, 255, 255, 0.06) 100%);
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .quote-card.floating {
          animation: float 6s ease-in-out infinite;
        }

        .quote-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 70%, 
            rgba(255, 255, 255, 0.05) 0%, 
            transparent 50%);
          border-radius: 20px;
        }

        .quote-ornament {
          width: 80px;
          height: 80px;
          margin: 0 auto 30px;
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.2), 
            rgba(255, 255, 255, 0.05));
          border-radius: 50%;
          position: relative;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quote-ornament.rotating {
          animation: rotate 8s linear infinite;
        }

        .quote-symbol {
          font-size: 3rem;
          color: #ffffff;
          font-weight: bold;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }

        .main-quote p {
          font-size: 1.8rem;
          font-style: italic;
          color: #ffffff;
          margin-bottom: 25px;
          line-height: 1.8;
          position: relative;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .quote-text.typing-effect {
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #ffffff;
          animation: typeQuote 4s steps(50) 1s forwards, blink 1s infinite step-end 5s;
          width: 0;
        }

        @keyframes typeQuote {
          0% { width: 0; }
          100% { width: 100%; white-space: normal; }
        }

        .quote-author {
          color: rgba(255, 255, 255, 0.9);
          font-weight: bold;
          font-size: 1.2rem;
          opacity: 0;
          transform: translateY(20px);
        }

        .quote-author.slide-up {
          animation: slideUpAuthor 1s ease-out 6s forwards;
        }

        @keyframes slideUpAuthor {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ============================================ */
        /* FOOTER STYLES */
        /* ============================================ */
        .footer {
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
          color: #ffffff;
          padding: 60px 0;
          text-align: center;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .footer-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.02) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.02) 50%, transparent 51%);
          background-size: 20px 20px;
        }

        .footer-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
        }

        .footer-ornament.expanding {
          animation: expandFooter 2s ease-out;
        }

        @keyframes expandFooter {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        .ornament-center {
          width: 250px;
          height: 3px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.8) 20%, 
            #ffffff 50%, 
            rgba(255, 255, 255, 0.8) 80%, 
            transparent 100%);
          position: relative;
        }

        .ornament-center::before,
        .ornament-center::after {
          content: '';
          position: absolute;
          top: -3px;
          width: 10px;
          height: 10px;
          background: #ffffff;
          transform: rotate(45deg);
        }

        .ornament-center::before {
          left: 40px;
        }

        .ornament-center::after {
          right: 40px;
        }

        .footer-content {
          position: relative;
          z-index: 2;
        }

        .footer-text {
          font-size: 1.1rem;
          opacity: 0;
          margin-bottom: 30px;
        }

        .footer-text.fade-in {
          animation: fadeInText 1s ease-out 1s forwards;
        }

        @keyframes fadeInText {
          to { opacity: 0.9; }
        }

        .footer-decoration {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .decoration-element {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
        }

        .decoration-element.pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          0% { 
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
            opacity: 0.6;
          }
          100% { 
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
            opacity: 1;
          }
        }

        .decoration-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.3s; }
        .dot:nth-child(3) { animation-delay: 0.6s; }

        /* ============================================ */
        /* RESPONSIVE DESIGN */
        /* ============================================ */
        @media (max-width: 992px) {
          .sections-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .sections-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          .header {
            min-height: 90vh;
            padding: 40px 0;
          }

          .title-line {
            font-size: 2.8rem;
            letter-spacing: 2px;
            margin-bottom: 15px;
          }
          
          .subtitle {
            font-size: 1.3rem;
            letter-spacing: 1px;
          }

          .portrait-frame {
            width: 140px;
            height: 140px;
            margin: 30px auto;
          }
          
          .stats-container {
            flex-direction: column;
            gap: 25px;
          }
          
          .stat-divider {
            width: 50px;
            height: 2px;
            transform: rotate(0deg);
          }
          
          .sections-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 60px;
          }

          .vintage-card.large {
            padding: 32px 20px;
          }
          
          .vintage-card {
            padding: 20px 16px;
            margin-bottom: 16px;
          }

          .vintage-card.large {
            padding: 40px 25px;
          }
          
          .section-title {
            font-size: 1.8rem;
            margin-bottom: 15px;
          }

          .section-description {
            font-size: 1rem;
            line-height: 1.5;
          }
          
          .main-quote p {
            font-size: 1.3rem;
            line-height: 1.5;
          }
          
          .first-name, .last-name {
            font-size: 2.2rem;
            letter-spacing: 3px;
          }
          
          .loading-bar {
            width: 280px;
          }

          .loading-text {
            font-size: 1.2rem;
          }

          .vintage-frame {
            padding: 35px;
          }

          .quote-text.typing-effect {
            white-space: normal;
            width: 100%;
            border-right: none;
            animation: none;
          }

          .quote-author.slide-up {
            animation: slideUpAuthor 1s ease-out forwards;
            animation-delay: 1s;
          }

          .navigation {
            padding: 15px 0;
          }

          .lang-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }

          .main-content {
            padding: 60px 0;
          }

          .footer-content {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .vintage-button {
            padding: 12px 20px;
            font-size: 0.9rem;
            min-height: 44px;
          }
        }

        @media (max-width: 480px) {
          .header {
            min-height: 100vh;
            padding: 30px 0;
          }

          .container {
            padding: 0 15px;
          }

          .title-line {
            font-size: 2.2rem;
            letter-spacing: 1px;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .portrait-frame {
            width: 120px;
            height: 120px;
            margin: 25px auto;
          }

          .vintage-card.large {
            padding: 30px 20px;
          }

          .vintage-card {
            padding: 20px 15px;
          }

          .stat-number {
            font-size: 2.2rem;
          }

          .stat-label {
            font-size: 0.9rem;
          }

          .section-icon {
            padding: 10px;
            margin-right: 12px;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .section-description {
            font-size: 0.9rem;
          }

          .vintage-button {
            padding: 12px 20px;
            font-size: 0.85rem;
            min-height: 44px;
          }

          .first-name, .last-name {
            font-size: 1.8rem;
            letter-spacing: 2px;
          }

          .loading-bar {
            width: 250px;
          }

          .vintage-frame {
            padding: 25px 20px;
          }

          .main-quote p {
            font-size: 1.1rem;
          }

          .quote-author {
            font-size: 1rem;
          }

          .lang-btn {
            padding: 8px 14px;
            font-size: 0.85rem;
            min-height: 40px;
          }

          .main-content {
            padding: 40px 0;
          }

          .hero-section {
            margin-bottom: 50px;
          }

          .sections-grid {
            gap: 20px;
            margin-bottom: 50px;
          }
        }

        @media (max-width: 360px) {
          .container {
            padding: 0 12px;
          }

          .title-line {
            font-size: 1.9rem;
          }

          .first-name, .last-name {
            font-size: 1.6rem;
          }

          .vintage-card {
            padding: 18px 12px;
          }

          .vintage-card.large {
            padding: 25px 15px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .loading-bar {
            width: 220px;
          }

          .vintage-frame {
            padding: 20px 15px;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .main-quote p {
            font-size: 1rem;
          }

          .lang-btn {
            padding: 6px 12px;
            font-size: 0.8rem;
          }
        }

        /* ============================================ */
        /* UTILITY ANIMATIONS */
        /* ============================================ */
        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* ============================================ */
        /* SCROLLBAR STYLING */
        /* ============================================ */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.5));
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #ffffff;
        }

        /* ============================================ */
        /* ADMIN MODAL STYLES */
        /* ============================================ */
        .admin-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }

        .admin-content {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            rgba(0, 0, 0, 0.1) 100%);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .admin-header h2 {
          color: #ffffff;
          font-size: 1.8rem;
          margin: 0;
        }

        .close-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255, 0, 0, 0.2);
          border-color: rgba(255, 0, 0, 0.5);
          transform: scale(1.1);
        }

        .admin-body {
          color: #ffffff;
        }

        .admin-body p {
          margin-bottom: 15px;
          line-height: 1.6;
        }

        .admin-stats {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 15px;
          margin-top: 20px;
        }

        .admin-stats p {
          margin: 0;
          font-weight: bold;
        }
      `}</style>
      </div>
    </Router>
  );
};

export default App;