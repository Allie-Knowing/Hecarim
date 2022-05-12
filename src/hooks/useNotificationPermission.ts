import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

export const useNotificationPermission = () => {
  const [token, setToken] = useState<string>(undefined);

  const askNotificationPermission = async () => {
    const { status: currentStatus } =
      await Notifications.requestPermissionsAsync();
    return currentStatus;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") status = await askNotificationPermission();
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setToken(token);
    })();
  }, []);

  return { token, isGranted: token !== undefined, askNotificationPermission };
};
