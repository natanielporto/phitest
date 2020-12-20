import React, {useState, useEffect, useCallback} from 'react';
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

interface Receipt {
  authentication: string;
  createdAt: string;
  to: string;
  amount: number;
  description: string;
  tType: string;
}

const Receipts: React.FC = () => {
  const route = useRoute();
  const {receiptId} = route.params as RouteParams;
  const [receipt, setReceipt] = useState<Receipt>({});

  const {goBack} = useNavigation();

  useEffect(() => {
    api.get(`/myStatement/detail/${receiptId}`).then((response) => {
      setReceipt(response.data);
    });
  }, [receiptId]);

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
        <ReceiptBodyBottomText>{receipt.tType}</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Valor</ReceiptBodyTopText>
        <ReceiptBodyBottomText>{receipt.amount}</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Recebedor</ReceiptBodyTopText>
        <ReceiptBodyBottomText>{receipt.to}</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Instituição bancária</ReceiptBodyTopText>
        <ReceiptBodyBottomText>{receipt.description}</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Data/Hora</ReceiptBodyTopText>
        <ReceiptBodyBottomText>{receipt.createdAt}</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ReceiptBodyView>
        <ReceiptBodyTopText>Autenticação</ReceiptBodyTopText>
        <ReceiptBodyBottomText>{receipt.authentication}</ReceiptBodyBottomText>
      </ReceiptBodyView>
      <ShareButton>
        <ShareButtonText>Compartilhar</ShareButtonText>
      </ShareButton>
    </SafeAreaView>
  );
};

export default Receipts;
