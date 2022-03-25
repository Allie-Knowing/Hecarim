import styled from "styled-components/native";

export const Question = styled.Image<{ imageWidth: number }>`
  width: ${({ imageWidth }) => imageWidth};
  height: 266px;
  margin: 0 10px 20px 10px;
  border-radius: 10px;
`;
