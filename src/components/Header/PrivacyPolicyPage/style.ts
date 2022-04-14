import styled from "styled-components/native";

export const Container = styled.View<{
  topPad: number;
}>`
  width: 100%;
  position: relative;
  height: ${({ topPad }) => 40 + topPad}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackIcon = styled.Image<{
  topPad: number;
}>`
  width: 10px;
  height: 18px;
  margin-left: 20px;
  margin-top: ${({ topPad }) => topPad }px;
`;
