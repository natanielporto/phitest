import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import api from '../../services/Api';
import {
  BalanceView,
  YourBalanceText,
  BalanceValueNumber,
  HideBalanceLine,
  StyledBalanceView,
} from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number>();
  const [closed, setClosed] = useState<boolean>();

  const handleCloseBalance = async () => {
    try {
      const closedBalance = !closed;

      setClosed(closedBalance);

      await AsyncStorage.setItem('@phitest', String(closedBalance));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    api.get('/myBalance').then((response) => {
      setBalance(response.data.amount);
    });

    AsyncStorage.getItem('@phitest').then((settings) => {
      setClosed(settings === 'true');
    });
  }, []);

  return (
    <BalanceView
      onPress={handleCloseBalance}
    >
        <StyledBalanceView>
          <YourBalanceText>Seu saldo</YourBalanceText>
          <Icon
            name={closed ? 'eye' : 'eye-with-line'}
            size={24}
            color="#00c1af"
          />
        </StyledBalanceView>
        {balance && (
          <BalanceValueNumber onPress={handleCloseBalance}>
            {closed ? (
              <View>
                <HideBalanceLine />
              </View>
            ) : (
              `R$ ${balance.toFixed(2)}`
            )}
          </BalanceValueNumber>
        )}
    </BalanceView>
  );
};

export default Balance;
