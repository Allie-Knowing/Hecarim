import React, { FC } from "react";
import { Dimensions } from "react-native";
import * as S from "./styles";
import AutoHeightImage from "react-native-auto-height-image";

const makeKnowingBanner = require("assets/make_knowing_banner.png");

const { width } = Dimensions.get("window");

const MakeKnowingBanner: FC = () => {
  return (
    <S.Container width={width}>
      <AutoHeightImage width={width} source={makeKnowingBanner} />
    </S.Container>
  );
};

export default MakeKnowingBanner;
