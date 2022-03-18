import styled from "styled-components/native";

export const Container = styled.View<{
  topPad: number;
}>`
  width: 100%;
  height: ${({ topPad }) => 50 + topPad};
  justify-content: center;
  padding-top: ${({ topPad }) => topPad};
`;

export const BackIcon = styled.Image`
  width: 10px;
  height: 18px;
  margin-left: 20px;
`;
