import React from 'react';

// Déclare les types pour les props
interface WalletProps {
  setInitialMonth: React.Dispatch<React.SetStateAction<number>>;
}

function Wallet({ setInitialMonth }: WalletProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialMonth(parseInt(event.target.value));
  };

  return (
    <div className="wallet-page">
      <h1>Wallet Page</h1>
      <noscript>To see this application, you need JavaScript enabled</noscript>
      <label htmlFor="initialMonth">Total for Month in $</label>
      <input
        type="number"
        id="initialMonth"
        onChange={handleChange}
      />
    </div>
  );
}

export default Wallet;
