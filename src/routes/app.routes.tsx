import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FinancialReport from '../pages/FinancialReport/FinancialReport';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
     }}>
    <App.Screen name="FinancialReport" component={FinancialReport} />
  </App.Navigator>
);

export default AppRoutes;
