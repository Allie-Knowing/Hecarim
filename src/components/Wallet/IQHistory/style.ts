import styled from "styled-components/native";

export const IQHistoryContainer = styled.View`
  width: 100%;
  margin-top: 56px;
  padding: 0px 20px;
`;

export const IQHistoryHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IQHistoryButton = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  border-radius: 8px;
`;

export const IQHistoryButtonIcon= styled.Image`
  width: 16px;
  height: 16px;
`;

export const ModalBackground = styled.TouchableOpacity<{height: number}>`
  width: 100%;
  height: ${({ height }) => height}px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.View`
  padding: 20px;
  border-radius: 14px;
  max-width: 300px;
  background: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const ModalContent = styled.Text`
  background: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale80};
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const IQHistoryList = styled.FlatList`
  margin-top: 30px;
  height: 300px;
`;
