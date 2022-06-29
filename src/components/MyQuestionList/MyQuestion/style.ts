import styled from "styled-components/native";

export const Question = styled.View<{ imageWidth: number }>`
  width: ${({ imageWidth }) => imageWidth};
  height: 266px;
  margin: 0 10px 20px 10px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

export const QuestionImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const DefaultQuestion = styled.View<{ imageWidth: number }>`
  width: ${({ imageWidth }) => imageWidth};
  height: 266px;
  margin: 0 10px 20px 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
  position: relative;
  overflow: hidden;
`;

export const QuestionInformation = styled.View`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 12px 14px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale100};
  opacity: 0.6;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const QuestionInformationIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-right: 4px;
  overflow: visible;
`;

export const QuestionInformationText = styled.Text`
  font: ${({ theme }) => theme.fonts.description2};
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;
