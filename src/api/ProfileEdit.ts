import uri from "constance/uri";
import { instance } from "utils/axios";

export const putProfile = async (formData: any) => {
  return await instance.put(uri.profile, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
