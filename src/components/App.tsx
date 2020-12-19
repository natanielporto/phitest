import React from 'react';
import Balance from './Balance/Balance';
import Transactions from './Transactions/Transactions';
import {ScreenTitle, TextTitle} from './styles';
import {StatusBar, SafeAreaView} from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScreenTitle>
        <TextTitle>Extrato</TextTitle>
      </ScreenTitle>
      <Balance />
      <Transactions />
    </SafeAreaView>
  );
};

export default App;
