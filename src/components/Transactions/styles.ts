import styled from 'styled-components/native';

export const MainView = styled.View`
  margin-left: 16px;
`;

export const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0 30px 0;
`;

export const DetailedView = styled.View`
  margin: 0 0 20px 0px;
  padding: 10px 0 10px 46px;
  background-color: ${({pix}) =>
    pix === 'PIXCASHIN' || pix === 'PIXCASHOUT' ? '#f8f8f8' : '#FFF'};
`;

export const TransferType = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
  margin-right: 20px;
`;

export const TransferText = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const IdAndDate = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
  margin-right: 20px;
`;

export const IdText = styled.Text`
  color: #828282;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const DateText = styled.Text`
  color: #828282;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const PixView = styled.View`
  padding: 2px 18px;
  background-color: #00c1af;
`;

export const PixText = styled.Text`
  font-size: 12px;
  color: #fff;
`;

export const ValueInReais = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const GreenDot = styled.Text`
  height: 13px;
  width: 13px;
  border-radius: 50px;
  border: 2px solid #fff;
  background-color: #00c1af;
  position: absolute;
  top: 38px;
  right: 360px;
  z-index: 2;
`;

export const Grayline = styled.View`
  background-color: #828282;
  height: 130px;
  width: 1px;
  right: 366px;
  position: absolute;
  flex: 1;
  z-index: 1;
`;
