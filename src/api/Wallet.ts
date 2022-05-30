import uri from "constance/uri";
import { BANK } from "constance/wallet/bank";
import { instance } from "utils/axios";

export interface getPointResponse {
  category_name: string;
  next_tot_iq: number;
  next_adoption_cnt: number;
  image_url: string;
  adoption_cnt: number;
  cur_cnt: number;
  tot_cnt: number;
}

export interface getActivityScoreResponse {
  action_point: number;
}

export interface postExchangeCashRequest {
  cash: number;
  bank: BANK;
  account_owner: string;
  account_number: string;
}

export const getWalletPoint = async () => {
  const data = await instance.get<{ data: getPointResponse }>(uri.wallet);
  return data?.data?.data;
};

export const getActivityScore = async () => {
  const data = await instance.get<{ data: getActivityScoreResponse }>(
    `${uri.wallet}/action`
  );
  return data?.data?.data;
};

export const postExchangeCash = async (
  requestBody: postExchangeCashRequest
) => {
  const data = await instance.post(uri.exchangeCash, requestBody);
  console.log(data);

  return data;
};
