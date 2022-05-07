import uri from "constance/uri";
import storageKeys from "constant/storageKeys";
import { instance } from "utils/axios";
import localStorage from "utils/localStorage";

export interface IQHistoryResponse {
  amount: number;
  created_at: string;
  payment_type: string;
  id: number;
}

export const getIQHistory = async (page: number) => {
  const data = await instance.get<{ data: IQHistoryResponse }>(
    `${uri.wallet}/history?page=${page}&size=10`
  );
  return data?.data?.data;
};
