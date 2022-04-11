import styled from "styled-components/native";
import { Platform } from "react-native";

export const Wrapper = styled.View<{ topPad:number }>`
    position: relative;
    justify-content: center;
    align-items: center;
    border: 1px ${({theme}) => theme.colors.grayscale.scale20};
    background-color: ${({theme}) => theme.colors.grayscale.scale20};
    border-radius: 10;
    height: 72%;
    width: 90%;
`;

export const Message = styled.Text`
    color: ${({ theme }) => theme.colors.grayscale.scale50};
    text-align: center;
    font: ${({ theme }) => theme.fonts.body3};
`;

export const MagnifyImage = styled.Image`
    position: absolute;
    left: 8;
    width: 18px;
    height: 18px;
    z-index: 2;
`;

export const Input = styled.TextInput<{ topPad: number }>`
    padding: ${Platform.OS === 'android' ? 6 : 0}px 32px;
    padding-bottom: ${Platform.OS === 'ios' ? 3 : 0}px;
    width: 100%;
    height: 100%;
    position: absolute;
    color: ${({theme}) => theme.colors.grayscale.scale100};
    font: ${({theme}) => theme.fonts.body3};
`;

export const ResetImageContainer = styled.TouchableOpacity`
    position: absolute;
    right: 8;
`;

export const ResetTextImage = styled.Image`
    width: 18;
    height: 18;
    z-index: 2;
`;

export const WrapperOfScrollView = styled.View`
    position: relative;
    top: 40%;
    width: 100%;
    z-index: 100;
`;

export const ValueMappingContainer = styled.ScrollView<{ topPad: number }>`
    position: absolute;
    padding: 0 12px;
`;

export const ResultViewTitle = styled.Text`
    font: ${({ theme }) => theme.fonts.description2};
    color: ${({ theme }) => theme.colors.grayscale.scale50};
`;