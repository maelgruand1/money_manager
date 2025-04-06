import React, { useState } from 'react';
import Wallet from './Wallet'; // Assurez-vous d'importer Wallet

function Home() {
  const [initialMonth, setInitialMonth] = useState<number>(0);

  return (
    <div className="home-page">
      <h1>Money Manager</h1>
      <p>Welcome! Manage your expenses and income easily with this app.</p>
      <noscript>To see this application, you need JavaScript enabled</noscript>

      {/* Passe la fonction setInitialMonth à Wallet */}
      <Wallet setInitialMonth={setInitialMonth} />
      
      {/* Affiche la valeur actuelle de initialMonth */}
      <p id="seeTot">{`Initial value of the month: ${initialMonth}`}</p>
    </div>
  );
}

export default Home;
