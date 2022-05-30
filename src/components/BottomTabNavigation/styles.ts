import styled from "styled-components/native";

export const Label = styled.Text`
  font: ${({ theme }) => theme.fonts.description2};
  margin-top: 4px;
`;

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  padding: 6px 0px;
  z-index: 2;
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
  text-align: center;
`;
