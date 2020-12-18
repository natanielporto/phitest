import React from 'react';
import Balance from './Balance/Balance';
import Transactions from './Transactions/Transactions';
import {ScreenTitle, TextTitle} from './styles';

const App: React.FC = () => {
  return (
    <>
      <ScreenTitle>
        <TextTitle>Extrato</TextTitle>
      </ScreenTitle>
      <Balance />
      <Transactions />
    </>
  );
};

export default App;
