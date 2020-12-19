import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Balance from '../../components/Balance/Balance';
import Transactions from '../../components/Transactions/Transactions';
import {ScreenTitle, TextTitle} from './styles';

const FinancialReport: React.FC = () => {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView>
      <ScreenTitle>
        <TextTitle>Extrato</TextTitle>
      </ScreenTitle>
      <Balance />
      <Transactions />
    </SafeAreaView>
  );
};

export default FinancialReport;
