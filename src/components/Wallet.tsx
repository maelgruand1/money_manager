import React, { useState, useEffect } from 'react';
import { useObjectStore } from './Storage'; // Importez le hook personnalisé

interface WalletProps {}

function Wallet({}: WalletProps) {
  const [initialMonth, setInitialMonth] = useState<number>(0);
  const [expenses, setExpenses] = useState<number[]>([]);
  const [isEuro, setIsEuro] = useState<boolean>(false);

  // Utilisez le hook pour accéder à l'object store 'walletData'
  const { put: putWalletData, get: getWalletData, isReady: isDBReady, error: DBError } = useObjectStore('walletData');

  // Charger les données depuis IndexedDB au démarrage (ou lorsque la DB est prête initialement)
  useEffect(() => {
    console.log("isDBReady:", isDBReady, "DBError:", DBError);
    if (isDBReady && !DBError) {
      getWalletData(1)
        .then((data) => {
          console.log("Résultat de getWalletData:", data);
          if (data) {
            console.log("Données chargées depuis IndexedDB:", data);
            setInitialMonth(data.initialMonth || 0);
            setExpenses(data.expenses || []);
            setIsEuro(data.isEuro || false);
          } else {
            console.log("Aucune donnée trouvée dans IndexedDB, utilisation des valeurs par défaut.");
          }
        })
        .catch((err) => console.error("Erreur lors du chargement depuis IndexedDB:", err));
    } else if (DBError) {
      console.error("Erreur de base de données IndexedDB:", DBError);
    }
  }, [isDBReady, DBError]); // Suppression de getWalletData comme dépendance

  // Sauvegarder les données dans IndexedDB à chaque changement (utilisation de 'put')
  useEffect(() => {
    if (isDBReady && !DBError) {
      console.log("Sauvegarde dans IndexedDB:", { initialMonth, expenses, isEuro });
      putWalletData({ id: 1, initialMonth, expenses, isEuro })
        .then((key) => console.log("Données du portefeuille sauvegardées dans IndexedDB avec la clé:", key))
        .catch((err) => console.error("Erreur lors de la sauvegarde dans IndexedDB:", err));
    }
  }, [initialMonth, expenses, isEuro, isDBReady, DBError, putWalletData]);

  useEffect(() => {
    console.log("État local après potentielle mise à jour:", { initialMonth, expenses, isEuro }); // Log de l'état local
  }, [initialMonth, expenses, isEuro]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d+$/.test(value) || value === '') {
      setInitialMonth(value === '' ? 0 : parseInt(value, 10));
    }
  };
 
  const handleAddExpense = () => {
    const expenseInput = prompt("Enter expense amount in dollars:");
    if (expenseInput && !isNaN(Number(expenseInput))) {
      const expenseAmount = parseFloat(expenseInput);
      setExpenses([...expenses, expenseAmount]);
    } else if (expenseInput !== null) {
      alert("Invalid expense amount. Please enter a number.");
    }
  };

  const handleConvertCurrency = () => {
    setIsEuro(!isEuro);
  };

  const conversionRate = 0.91; // Taux de conversion fixe (1 USD = 0.91 EUR)

  const convertToEuro = (value: number): number => {
    return value * conversionRate;
  };

  const calculateTotal = (): number => {
    return expenses.reduce((acc, expense) => acc + expense, 0);
  };

  return (
    <div className='wallet-page'>
      <h1>Wallet</h1>
      <noscript>To see this application, you need JavaScript enabled</noscript>

      {DBError && <p style={{ color: 'red' }}>Erreur IndexedDB: {DBError.message}</p>}
      {!isDBReady && !DBError && <p>Chargement de la base de données...</p>}

      <label htmlFor="initialMonth">Total for Month in $:</label>
      <input
        type="number"
        id='initialMonth'
        value={initialMonth}
        onChange={handleChange}
      />

      <button onClick={handleAddExpense}>Add Expense</button>

      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {isEuro ? `${convertToEuro(expense).toFixed(2)} €` : `${expense.toFixed(2)} $`}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleConvertCurrency}>
        {isEuro ? "Convert to Dollars" : "Convert to Euro"}
      </button>

      <div>
        <h3>Total Expenses: {isEuro ? `${convertToEuro(calculateTotal()).toFixed(2)} €` : `${calculateTotal().toFixed(2)} $`}</h3>
        <p>Initial Month: {initialMonth}</p> {/* Ajout pour afficher initialMonth */}
        <p>Is Euro: {isEuro ? 'Oui' : 'Non'}</p> {/* Ajout pour afficher isEuro */}
      </div>
    </div>
  );
}

export default Wallet;