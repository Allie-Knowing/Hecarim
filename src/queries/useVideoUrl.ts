import { useMutation } from "react-query";
import { useContext } from "react";
import { UploadingStatusContext } from "context/UploadingStatusContext";
import uri from "constance/uri";
import { instance } from "utils/axios";

interface responseType {
  data: {
    data: {
      url: string;
    };
  };
}

interface mutateType {
  type: "question" | "answer";
  file: string | FormData;
}

export const useVideoUrlMutation = () => {
  const { setStatus } = useContext(UploadingStatusContext);

  const getVideoUrl = async (
    type: "question" | "answer",
    file: string | FormData
  ) => {
    const data: responseType = await instance.post(`${uri.file}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        type,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        setStatus(Math.ceil((loaded * 100) / total));
      },
    });

    return data;
  };

  const videoUrl = useMutation((mutation: mutateType) =>
    getVideoUrl(mutation.type, mutation.file)
  );

  return { videoUrl };
};
