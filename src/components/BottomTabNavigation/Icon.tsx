import { useContext } from "react";
import { Image } from "react-native";
import { ThemeContext } from "styled-components/native";

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

const Icon =
  (name: string) =>
  ({ focused }: PropsType) => {
    const themeContext = useContext(ThemeContext);
    let tabIcon = iconMap.get(name)!;

    return (
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
    );
  };

export default Icon;
