import AsyncStorageLib from "@react-native-async-storage/async-storage";

const localStorage = {
  setItem: async <T = unknown>(key: string, value: T) => {
    try {
      await AsyncStorageLib.setItem(key, JSON.stringify(value));

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  getItem: async <T = unknown>(key: string) => {
    return JSON.parse(await AsyncStorageLib.getItem(key)) as T;
  },
  removeItem: async (key: string) => {
    return await AsyncStorageLib.removeItem(key);
  },
};

export default localStorage;
