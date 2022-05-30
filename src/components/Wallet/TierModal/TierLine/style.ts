import styled from "styled-components/native";

export const TableLine = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px 0px;
`;

export const TableContent = styled.Text<{ isBold: boolean }>`
  width: 25%;
  padding: 0px 5px;
  padding-left: 3px;
  font-size: 10px;
  font-weight: ${({ isBold }) => (isBold ? "bold" : "normal")};
`;  
