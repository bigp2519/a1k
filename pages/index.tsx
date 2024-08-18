import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { SwapWidget } from '@skip-go/widget';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState('swap');

  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars';
      
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        star.style.setProperty('--twinkle-duration', `${Math.random() * 5 + 5}s`);
        starsContainer.appendChild(star);
      }

      document.body.appendChild(starsContainer);
    };

    createStars();

    const glow = document.createElement('div');
    glow.className = 'glow';
    document.body.appendChild(glow);

    return () => {
      document.body.removeChild(document.querySelector('.stars')!);
      document.body.removeChild(document.querySelector('.glow')!);
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'swap':
        return (
          <div className={styles.widgetContainer}>
            <SwapWidget
              defaultRoute={{
                srcChainID: 'osmosis-1',
                srcAssetDenom: 'ibc/1480b8fd20ad5fcae81ea87584d269547dd4d436843c1d20f15e00eb64743ef4',
              }}
              theme={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                textColor: 'white',
                borderColor: '#333',
                brandColor: '#FF4FFF',
                highlightColor: 'rgba(255, 79, 255, 0.1)',
              }}
              apiURL="/api/skip-proxy?url="
            />
          </div>
        );
      case 'stats':
        return (
          <div className={styles.statsContainer}>
            <h3>Token Statistics</h3>
            <div className={styles.tradingViewWidget}>
              TradingView Widget Placeholder
            </div>
          </div>
        );
      case 'info':
        return (
          <div className={styles.infoContainer}>
            <h3>Additional Information</h3>
            <p>Total Supply: 9,718,859</p>
            <p>We are a group of diehard ATOM Cosmonauts who WILL NOT SELL*</p>
            <p>*NFA. This coin is just for fun! Trade at your own risk.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage} />
      <div className={styles.content}>
        <h1 className={styles.title}>$ATOM1KLFG</h1>
        <p className={styles.subtitle}>ATOM to $1,000 LFG!!!</p>

        <div className={styles.buyOptions}>
          <h3>Where to buy:</h3>
          <div className={styles.buttonContainer}>
            <a href="https://app.osmosis.zone/" className={styles.buyButton}>Osmosis</a>
            <a href="https://coinhall.org/" className={styles.buyButton}>Coinhall</a>
            <a href="https://astroport.fi/" className={styles.buyButton}>Astroport</a>
            <a href="https://twitter.com/isaac_defi" className={styles.buyButton}>Isaac</a>
          </div>
        </div>

        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === 'swap' ? styles.active : ''}`}
            onClick={() => setActiveTab('swap')}
          >
            Swap
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'stats' ? styles.active : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'info' ? styles.active : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Info
          </button>
        </div>

        {renderTabContent()}
      </div>

      <footer className={styles.footer}>
        <p>Copyright © 2024 ATOM1KLFG - All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;