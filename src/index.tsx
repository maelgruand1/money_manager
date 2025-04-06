import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { StorageProvider } from './components/Storage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StorageProvider dbName="moneyManagerDB" version={2} objectStores={['transactions', 'categories', 'walletData']}>
      <App />
    </StorageProvider>
  </React.StrictMode>
);
