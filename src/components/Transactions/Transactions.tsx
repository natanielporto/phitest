import React, {useState, useEffect} from 'react';
import {Button, View, TouchableOpacity, Text} from 'react-native';
import api from '../../services/Api';
import {MainView, HeaderText, TransferenceType, DetailedView} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native-gesture-handler';

interface ObjectDTO {
  amount: number;
  createdAt: string;
  description: string;
  id: string;
  tType: string;
  to: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Array<ObjectDTO>>();

  async function getTransactions(): Promise<void> {
    try {
      const response = await api.get('/myStatement/8/0');
      setTransactions(response.data.items);
    } catch {
      setTransactions([]);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <MainView>
        <HeaderText>Suas Movimentações</HeaderText>
        {transactions ? (
          <FlatList
            data={transactions}
            keyExtractor={(transaction) => transaction.id}
            renderItem={({item: el}) => (
              <DetailedView>
                <TransferenceType>
                  <Text>{el.description}</Text>
                  <Text>{el.tType}</Text>
                </TransferenceType>
                <View>
                  <Text>{el.to}</Text>
                  <Text>{el.createdAt}</Text>
                </View>
                <Text>R$ {el.amount.toFixed(2)}</Text>
              </DetailedView>
            )}
          />
        ) : (
          <Text />
        )}
      </MainView>
    </>
  );
};

export default Transactions;
