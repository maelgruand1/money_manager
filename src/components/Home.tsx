import React, { useState } from 'react';
import Wallet from './Wallet';

function Home() {
  const [showWallet, setShowWallet] = useState(false);

  const handleClick = () => {
    setShowWallet(true);
  };

  return (
    <div className='home-page'>
      <h1>Money Manager</h1>
      <p>Welcome! Manage your expenses and income easily with this app.</p>
      <noscript>To see this application, you need JavaScript enabled</noscript>
      <button onClick={handleClick}>Go to Wallet</button>

      {showWallet && <Wallet />}
    </div>
  );
}

export default Home;
