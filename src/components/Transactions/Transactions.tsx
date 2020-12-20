import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import api from '../../services/Api';
import {
  MainView,
  HeaderText,
  TransferType,
  TransferText,
  DetailedView,
  IdAndDate,
  IdText,
  DateText,
  PixView,
  PixText,
  ValueInReais,
  GreenDot,
  Grayline,
} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import formatDate from '../../helpers/helpers';

interface ObjectDTO {
  amount: number;
  createdAt: string;
  description: string;
  id: string;
  tType: string;
  to: string;
}

const Transactions: React.FC = () => {
  const {navigate} = useNavigation();

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

  const transferSwitch = (tType: string) =>
    ({
      TRANSFEROUT: <Text />,
      TRANSFERIN: <Text />,
      PIXCASHIN: (
        <PixView>
          <PixText>Pix</PixText>
        </PixView>
      ),
      PIXCASHOUT: (
        <PixView>
          <PixText>Pix</PixText>
        </PixView>
      ),
    }[tType]);

  const navigateToReceipt = useCallback(
    (receiptId: string) => {
      navigate('Receipts', {receiptId});
    },
    [navigate],
  );

  return (
    <View>
      <MainView>
        <HeaderText>Suas Movimentações</HeaderText>
      </MainView>
      {transactions ? (
        <FlatList
          data={transactions}
          keyExtractor={(transaction) => transaction.id}
          renderItem={({item: el}) => (
            <TouchableOpacity onPress={() => navigateToReceipt(el.id)}>
              <View>
                <DetailedView pix={el.tType}>
                  <TransferType>
                    <TransferText>{el.description}</TransferText>
                    <Text>{transferSwitch(el.tType)}</Text>
                  </TransferType>
                  <IdAndDate>
                    <IdText>{el.to}</IdText>
                    <DateText>{formatDate(el.createdAt, true)}</DateText>
                  </IdAndDate>
                  <ValueInReais>
                    {el.tType === 'PIXCASHOUT' || el.tType === 'TRANSFEROUT' ? (
                      <Text>- </Text>
                    ) : (
                      <Text />
                    )}
                    R$ {el.amount.toFixed(2)}
                  </ValueInReais>
                </DetailedView>
              </View>
              <GreenDot />
              <Grayline />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text />
      )}
    </View>
  );
};

export default Transactions;
