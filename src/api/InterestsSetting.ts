import uri from "constance/uri";
import { instance } from "utils/axios";

export const postInterestsSetting = async (interests: number[]) => {
  const response = await instance.post("/interests", {
    interest_categories: interests,
  });
  return response;
};
