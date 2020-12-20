import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../services/Api';
import formatDate from '../../helpers/helpers';
// import RNFS from 'fs';

import {
  StyledSafeAreaView,
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
  const viewShot = useRef(null);

  const {goBack} = useNavigation();

  useEffect(() => {
    api.get(`/myStatement/detail/${receiptId}`).then((response) => {
      setReceipt({...response.data});
    });
  }, [receiptId]);

  const {amount, authentication, createdAt, description, tType, to} = receipt;

  const receiptArr = {
    'Tipo de movimentação': description,
    Valor: amount ? `R$ ${amount.toFixed(2)}` : '',
    Recebedor: to,
    'Instituição bancária': tType,
    'Data/Hora': createdAt ? formatDate(createdAt) : '',
    Autenticação: authentication,
  };

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleCaptureAndShare = async () => {
    if (viewShot === null) {
      return console.log('Error in viewShot.');
    } else {
      viewShot.current.capture().then((uri: string) => {
        RNFS.readFile(uri, 'base64').then((res: string) => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
            title: 'Share Title',
            message: 'Share Message',
            url: urlString,
            type: 'image/jpeg',
          };
          Share.open(options)
            .then(() => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log(err);
            });
        });
      });
    }
  };

  return (
    <StyledSafeAreaView>
      <IconView onPress={navigateBack}>
        <Icon name="chevron-left" size={40} color="#828282" />
      </IconView>
      <ViewShot ref={viewShot} options={{format: 'jpg', quality: 0.9}}>
        <HeaderTextView>
          <ReceiptText>Comprovante</ReceiptText>
        </HeaderTextView>
        <ReceiptViewBorder />
        {receipt &&
          Object.entries(receiptArr).map(function ([key, value], index) {
            return (
              <ReceiptBodyView key={index}>
                <ReceiptBodyTopText>{key}</ReceiptBodyTopText>
                <ReceiptBodyBottomText>{value}</ReceiptBodyBottomText>
              </ReceiptBodyView>
            );
          })}
      </ViewShot>
      <ShareButton>
        <ShareButtonText onPress={handleCaptureAndShare}>
          Compartilhar
        </ShareButtonText>
      </ShareButton>
    </StyledSafeAreaView>
  );
};

export default Receipts;
