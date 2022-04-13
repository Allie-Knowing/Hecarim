import React, { FC } from "react";
import { View } from "react-native";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import SearchResultNavigation from "components/SearchPage/SearchResultNavigation";

interface Props {
  title: string;
}

const DefaultSearch: FC<Props> = ({ title }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [checkValue, setCheckValue] = React.useState<boolean>(false);
  return (
    <View>
      <SearchTopNavigation
        title={title}
        inputValue={inputValue}
        setInputValue={setInputValue}
        checkValue={checkValue}
        setCheckValue={setCheckValue}
      />
      <SearchResultNavigation
        inputValue={inputValue}
        setInputValue={setInputValue}
        setCheckValue={setCheckValue}
      />
    </View>
  );
};

export default DefaultSearch;
