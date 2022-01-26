import { useContext } from "react";
import { Image } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

const FeedIconDisable = require("../../assets/icons/navigation/feed/deactive.svg");
const MyPageIconDisable = require("../../assets/icons/navigation/mypage/deactive.svg");
const SearchIconDisable = require("../../assets/icons/navigation/search/deactive.svg");
const WalletIconDisable = require("../../assets/icons/navigation/wallet/deactive.svg");

interface PropsType {
  focused: boolean;
  color: string;
  size: number;
}

const iconMap = new Map<string, any>()
  .set("feed", FeedIconDisable)
  .set("mypage", MyPageIconDisable)
  .set("search", SearchIconDisable)
  .set("wallet", WalletIconDisable);

const labelMap = new Map<string, string>()
  .set("feed", "피드")
  .set("mypage", "MY")
  .set("search", "검색")
  .set("wallet", "지갑");

const Icon =
  (name: string) =>
  ({ focused }: PropsType) => {
    const themeContext = useContext(ThemeContext);
    let tabIcon = iconMap.get(name)!;

    return (
      <S.Container>
        <Image
          source={tabIcon}
          resizeMode="cover"
          style={{
            height: 20,
            width: 20,
            tintColor: !focused
              ? themeContext.colors.grayscale.scale30
              : themeContext.colors.primary.default,
          }}
        />
        <S.Label focused={focused}>{labelMap.get(name)}</S.Label>
      </S.Container>
    );
  };

export default Icon;
