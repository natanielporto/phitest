import React, {useState, useEffect} from 'react';
import api from '../../services/Api';
import {BalanceView, YourBalanceText, BalanceValueNumber} from './styles';

interface BalanceDTO {
  amount: number;
}

const Balance: React.FC = () => {
  const [balance, setBalance] = useState();

  async function getBalance(): Promise<void> {
    try {
      const response = await api.get<BalanceDTO>('/myBalance');
      console.log('resposta:', response);
      // setBalance(response);
    } catch {
      return;
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  console.log(balance);

  return (
    <BalanceView>
      <YourBalanceText>Seu saldo</YourBalanceText>
      <BalanceValueNumber>R$: {balance}</BalanceValueNumber>
    </BalanceView>
  );
};

export default Balance;
