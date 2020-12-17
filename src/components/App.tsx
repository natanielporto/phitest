import React from 'react';
import Balance from './Balance/Balance';
import {ScreenTitle, TextTitle} from './styles';

const App: React.FC = () => {
  return (
    <>
      <ScreenTitle>
        <TextTitle>Extrato</TextTitle>
      </ScreenTitle>
      <Balance />
    </>
  );
};

export default App;
