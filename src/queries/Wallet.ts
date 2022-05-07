import { getActivityScore, getWalletPoint } from "api/Wallet";
import queryKeys from "constant/queryKeys";
import { useQuery } from "react-query";

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
