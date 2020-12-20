import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Balance from '../../components/Balance/Balance';
import Transactions from '../../components/Transactions/Transactions';
import {ScreenTitle, TextTitle} from './styles';

const FinancialReport: React.FC = () => {
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
