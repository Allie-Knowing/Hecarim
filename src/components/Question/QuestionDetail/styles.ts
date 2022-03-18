import styled from "styled-components/native";

export const QuestionDetailWrapper = styled.View<{ left: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #e5e5e5;
  /* z-index: 10; */
  left: ${(props) => props.left};
  /* transition: all 1s; */
`;
