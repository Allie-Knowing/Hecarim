import { Image } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`;

export const Video = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const Content = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-bottom: 80px;
  align-items: flex-end;
  column-gap: 20px;
  flex-direction: row;
`;

export const InfoContainer = styled.View`
  flex: 1;
  row-gap: 5px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.body1};
  align-self: flex-end;
`;

export const Q = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.h2};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.description2};
`;

export const InvisiblePadding = styled.Text`
  color: transparent;
  font: ${({ theme }) => theme.fonts.h2};
`;

export const Icons = styled.View`
  flex-direction: column;
  row-gap: 20px;
  justify-content: flex-end;
`;

export const IconContainer = styled.View``;
