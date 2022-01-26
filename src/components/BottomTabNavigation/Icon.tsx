import { useContext } from "react";
import { Image } from "react-native";
import { ThemeContext } from "styled-components/native";
import * as S from "./styles";

const FeedIcon = require("../../assets/icons/navigation/feed.svg");
const MyPageIcon = require("../../assets/icons/navigation/mypage.svg");
const SearchIcon = require("../../assets/icons/navigation/search.svg");
const WalletIcon = require("../../assets/icons/navigation/wallet.svg");

interface PropsType {
  focused: boolean;
  color: string;
  size: number;
}

const iconMap = new Map<string, any>()
  .set("feed", FeedIcon)
  .set("mypage", MyPageIcon)
  .set("search", SearchIcon)
  .set("wallet", WalletIcon);

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
