import { useNavigation, StackActions } from "@react-navigation/native";
import * as S from "./style";

const Back_Icon = require("../../../../../assets/icons/Search/Back_btn.png");

const BackBtn = () => {
  const navigation = useNavigation();

  return (
    <S.BackBtnContainer
      onPress={() => navigation.dispatch(StackActions.popToTop())}
    >
      <S.BackBtn source={Back_Icon} />
    </S.BackBtnContainer>
  );
};

export default BackBtn;
