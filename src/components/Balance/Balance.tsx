import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import api from '../../services/Api';
import {
  BalanceView,
  YourBalanceText,
  BalanceValueNumber,
  HideBalanceLine,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number>();
  const [closed, setClosed] = useState<boolean>();

  async function getBalance(): Promise<void> {
    try {
      const response = await api.get('/myBalance');
      setBalance(response.data.amount);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCloseBalance = async () => {
    try {
      setClosed(!closed);
      await AsyncStorage.setItem('@phitest', String(closed));
    } catch (err) {
      console.log(err);
    }
  };

  const getUserBalanceSettings = async () => {
    const settings = await AsyncStorage.getItem('@phitest');
    if (settings === 'true') {
      setClosed(true);
    } else {
      setClosed(false);
    }
  };

  useEffect(() => {
    getBalance();
    getUserBalanceSettings();
  }, []);

  return (
    <BalanceView>
      <TouchableOpacity
        onPress={handleCloseBalance}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
        <YourBalanceText>
          Seu saldo{'  '}
          <Icon name={closed ? 'eye' : 'eye-off'} size={24} color="#00c1af" />
        </YourBalanceText>
        {balance && (
          <BalanceValueNumber onPress={handleCloseBalance}>
            {closed ? <HideBalanceLine /> : `R$ ${balance.toFixed(2)}`}
          </BalanceValueNumber>
        )}
      </TouchableOpacity>
    </BalanceView>
  );
};

export default Balance;
