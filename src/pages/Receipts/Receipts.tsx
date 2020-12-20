import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';
import api from '../../services/Api';
import formatDate from '../../helpers/helpers';

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
      setReceipt({...response.data});
    });
  }, [receiptId]);

  const {amount, authentication, createdAt, description, tType, to} = receipt;

  const receiptArr = {
    'Tipo de movimentação': description,
    Valor: `R$ ${amount.toFixed(2)}`,
    Recebedor: to,
    'Instituição bancária': tType,
    'Data/Hora': formatDate(createdAt),
    Autenticação: authentication,
  };

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
      {receipt &&
        Object.entries(receiptArr).map(function ([key, value]) {
          return (
            <ReceiptBodyView>
              <ReceiptBodyTopText>{key}</ReceiptBodyTopText>
              <ReceiptBodyBottomText>{value}</ReceiptBodyBottomText>
            </ReceiptBodyView>
          );
        })}
      <ShareButton>
        <ShareButtonText>Compartilhar</ShareButtonText>
      </ShareButton>
    </SafeAreaView>
  );
};

export default Receipts;
