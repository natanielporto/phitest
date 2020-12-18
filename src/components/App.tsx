import React from 'react';
import Balance from './Balance/Balance';
import Transactions from './Transactions/Transactions';
import {ScreenTitle, TextTitle} from './styles';
import {StatusBar} from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScreenTitle>
        <TextTitle>Extrato</TextTitle>
      </ScreenTitle>
      <Balance />
      <Transactions />
    </>
  );
};

export default App;
