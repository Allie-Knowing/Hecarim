import {
  getActivityScore,
  getWalletPoint,
  postExchangeCash,
  postExchangeCashRequest,
} from "api/Wallet";
import queryKeys from "constant/queryKeys";
import { useMutation, useQuery } from "react-query";

export const useWalletPoint = () =>
  useQuery([queryKeys.walletPoint], () => getWalletPoint(), {
    enabled: true,
    retry: false,
    cacheTime: 0,
  });

export const useActivityScore = () =>
  useQuery([queryKeys.walletActivityScore], () => getActivityScore(), {
    enabled: true,
    retry: false,
    cacheTime: 0,
  });

export const useExchangeCash = () =>
  useMutation((body: postExchangeCashRequest) => postExchangeCash(body));
