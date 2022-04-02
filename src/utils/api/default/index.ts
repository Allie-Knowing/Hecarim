import axios from "axios";

export const getRequest = () => {
    const request = axios.create({
      timeout: 10000,
      baseURL: 'http://knowing-server.allie.kr',
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    });
    return request;
};

export const getRequestWithAccessToken = (
    token: string,
    type: 'json' | 'blob' | 'text' = 'json',
  ) => {
    const request = axios.create({
      timeout: 10000,
      baseURL: 'http://knowing-server.allie.kr',
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
      responseType: type,
      withCredentials: true,
    });
    return request;
};