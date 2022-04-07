import {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grayscale.scale100};
  padding: 10px 0px 0px 0px;
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale50};
  text-align: center;
  font: ${({ theme }) => theme.fonts.body3};
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  padding-bottom: 4px;
  padding: 0px 20px;
`;

export const List = styled(BottomSheetFlatList)`
  flex: 1;
`;

export const InputContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.grayscale.scale90};
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;

export const InputMargin = styled.View`
  background-color: ${({ theme }) => theme.colors.grayscale.scale90};
`;

export const InputProfile = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 1000px;
  margin-right: 16px;
`;

export const Submit = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.primary.default};
  margin-left: 16px;
`;

export const Input = styled(BottomSheetTextInput)`
  flex: 1;
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const InputMessage = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale50};
  padding: 8px;
`;
