import { NextPage } from 'next';
import React, { useState } from 'react';
import { SwapWidget } from '@skip-go/widget';
import styles from '../styles/Home.module.css';
import AtomVisualization from '../components/AtomVisualization';

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState('swap');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'swap':
        return (
          <div className={styles.widgetContainer}>
            <SwapWidget
              defaultRoute={{
                srcChainID: 'noble-1',
                srcAssetDenom: 'uusdc',
                destChainID: 'neutron-1',
                destAssetDenom: 'factory/neutron13lkh47msw28yynspc5rnmty3yktk43wc3dsv0l/atom1klfg'
              }}
              theme={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)', // Increased opacity
                textColor: 'white',
                borderColor: '#e5821d',
                brandColor: '#9e011d',
                highlightColor: 'rgba(239, 181, 25, 0.1)',
              }}
              onWalletConnected={(data) => console.log('Wallet connected:', data)}
              onWalletDisconnected={() => console.log('Wallet disconnected')}
              onTransactionBroadcasted={(data) => console.log('Transaction broadcasted:', data)}
              onTransactionComplete={(data) => console.log('Transaction complete:', data)}
              onTransactionFailed={(error) => console.error('Transaction failed:', error)}
            />
          </div>
        );
      case 'stats':
        return (
          <div className={styles.soonContainer}>
            <h3>Token Statistics</h3>
            <div className={styles.soonSign}>
              <span>Coming Soon</span>
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
      <AtomVisualization />
      <div className={styles.content}>
        <h1 className={styles.title}>$ATOM1KLFG</h1>
        <p className={styles.subtitle}>ATOM to $1,000 LFG!!!</p>

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

        <div className={styles.buyOptions}>
          <h3>Also Trading on:</h3>
          <div className={styles.buttonContainer}>
            <a href="https://app.osmosis.zone/?from=ATOM&sellOpen=false&buyOpen=false&to=ATOM1KLFG" className={styles.buyButton}>Osmosis</a>
            <a href="https://coinhall.org/neutron/neutron1dqanamhpvuljprfmwjxww0w3r5qd66zz3glkh8lxszw85zkdn0hq630d58" className={styles.buyButton}>Coinhall</a>
            <a href="https://app.astroport.fi/swap?from=ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9&to=factory/neutron13lkh47msw28yynspc5rnmty3yktk43wc3dsv0l/ATOM1KLFG" className={styles.buyButton}>Astroport</a>
            <a href="https://t.me/newtonneutron/15291" className={styles.buyButton}>Isaac</a>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Copyright © 2024 ATOM1KLFG - All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;