import uri from "constance/uri";
import { instance } from "utils/axios";

interface responseType {
  data: {
    data: {
      url: string;
    };
  };
}

export const getVideoUrl = async (type: "question" | "answer", file: string | FormData) => {
  const data: responseType = await instance.post(`${uri.file}`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      type,
    },
  });

  return data;
};
