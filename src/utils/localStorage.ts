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
  getItem: async <T = unknown>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorageLib.getItem(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (e) {
      return null;
    }
  },
  removeItem: async (key: string) => {
    return await AsyncStorageLib.removeItem(key);
  },
};

export default localStorage;
