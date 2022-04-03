import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{ width: number }>`
  width: ${({ width }) => width};
  height: 60px;
  margin-bottom: 10px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 60px;
`;
