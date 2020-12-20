import React, {useState, useEffect, useCallback} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';
import api from '../../services/Api';

import {
  ReceiptViewBorder,
  HeaderTextView,
  IconView,
  ReceiptText,
  ReceiptBodyView,
  ReceiptBodyTopText,
  ReceiptBodyBottomText,
  ShareButton,
  ShareButtonText,
} from './styles';

interface RouteParams {
  receiptId: string;
}

const Receipts: React.FC = () => {
  const route = useRoute();
  const {receiptId} = route.params as RouteParams;
  const [receipt, setReceipt] = useState({});

  console.log(receiptId);
  // const [selectedReceipt, setSelectedReceipt] = useState(receiptId)

  const {goBack, navigate} = useNavigation();

  useEffect(() => {
    api.get(`/myStatement/detail/${receiptId}`).then((response) => {
      console.log(response);
      setReceipt(response.data);
    });
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView>
      <IconView onPress={navigateBack}>
        <Icon name="chevron-left" size={40} color="#828282" />
      </IconView>
      <HeaderTextView>
        <ReceiptText>Comprovante</ReceiptText>
      </HeaderTextView>
      <ReceiptViewBorder />
      <ReceiptBodyView>
        <ReceiptBodyTopText>Tipo de movimentação</ReceiptBodyTopText>
        <ReceiptBodyBottomText>Transferência enviada</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Valor</ReceiptBodyTopText>
        <ReceiptBodyBottomText>R$ 100,00</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Recebedor</ReceiptBodyTopText>
        <ReceiptBodyBottomText>David Bond</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Instituição bancária</ReceiptBodyTopText>
        <ReceiptBodyBottomText>Banco Phi</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Data/Hora</ReceiptBodyTopText>
        <ReceiptBodyBottomText>13/10/2020 - 15:27:02</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Autenticação</ReceiptBodyTopText>
        <ReceiptBodyBottomText>123445345</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ShareButton>
        <ShareButtonText>Compartilhar</ShareButtonText>
      </ShareButton>
    </SafeAreaView>
  );
};

export default Receipts;
