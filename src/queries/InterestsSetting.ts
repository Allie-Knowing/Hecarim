import { postInterestsSetting } from "api/InterestsSetting";
import { useMutation } from "react-query";

export const useInterestsSetting = () => {
  const InterestsSetting = useMutation((interests: number[]) =>
    postInterestsSetting(interests)
  );

  return InterestsSetting;
};
