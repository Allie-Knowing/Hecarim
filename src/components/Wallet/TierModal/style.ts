import styled from "styled-components/native";

export const TierModalContainer = styled.TouchableOpacity<{
  width: number;
  height: number;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(196, 196, 196, 0.8);
`;

export const Content = styled.View`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  border-radius: 5px;
  z-index: 99;
  padding: 20px;
`;

export const Table = styled.View`
  border: 1px;
  border-radius: 5px;
`;
