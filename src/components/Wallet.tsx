import React, { useState, useEffect } from 'react';

function Wallet() {
  const [initialMonth, setInitialMonth] = useState<number>(0);
  const [expenses, setExpenses] = useState<number[]>([]);
  const [isEuro, setIsEuro] = useState<boolean>(false);

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const savedInitialMonth = localStorage.getItem('initialMonth');
    const savedExpenses = localStorage.getItem('expenses');
    const savedIsEuro = localStorage.getItem('isEuro');

    if (savedInitialMonth) {
      setInitialMonth(JSON.parse(savedInitialMonth));
    }
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    if (savedIsEuro) {
      setIsEuro(JSON.parse(savedIsEuro));
    }
  }, []);

  // Sauvegarder les données dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('initialMonth', JSON.stringify(initialMonth));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('isEuro', JSON.stringify(isEuro));
  }, [initialMonth, expenses, isEuro]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialMonth(parseInt(event.target.value));
  };

  const handleAddExpense = () => {
    const expense = prompt("Enter expense amount in dollars");
    if (expense && !isNaN(Number(expense))) {
      setExpenses([...expenses, Number(expense)]);
    }
  };

  const handleConvertCurrency = () => {
    setIsEuro(!isEuro);
  };

  const convertToEuro = (value: number): number => {
    const conversionRate = 0.91; // Exemple de taux de conversion (1 USD = 0.91 EUR)
    return value * conversionRate;
  };

  const calculateTotal = (): number => {
    const total = expenses.reduce((acc, expense) => acc + expense, 0);
    return isEuro ? convertToEuro(total) : total;
  };

  return (
    <div className='wallet-page'>
      <h1>Wallet Page</h1>
      <noscript>To see this application, you need JavaScript enabled</noscript>

      <label htmlFor="initialMonth">Total for Month in $</label>
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
              {isEuro ? `${convertToEuro(expense).toFixed(2)} €` : `${expense} $`}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleConvertCurrency}>
        {isEuro ? "Convert to Dollars" : "Convert to Euro"}
      </button>

      <div>
        <h3>Total Expenses: {isEuro ? `${calculateTotal().toFixed(2)} €` : `${calculateTotal()} $`}</h3>
      </div>
    </div>
  );
}

export default Wallet;
