import styled from "styled-components/native";

export const TableLine = styled.View<{
  isLast: boolean;
}>`
  width: 100%;
  flex-direction: row;
  border-bottom-width: ${({ isLast }) => (isLast ? "0px" : "1px")};
  border-bottom-color: black;
  padding: 5px 0px;
`;

export const TableContent = styled.Text`
  width: 33%;
  padding: 0px 5px;
  padding-left: 3px;
`;
