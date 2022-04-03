import axios from 'axios';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const getRequest = () => {
    const request = axios.create({
      timeout: 10000,
      baseURL: 'https://munchkin.entrydsm.hs.kr',
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
      baseURL: 'https://munchkin.entrydsm.hs.kr',
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
      responseType: type,
      withCredentials: true,
    });
    return request;
  };
  
//   export const useIsLogin = () => {
//     const history = useHistory();
//     const setModalOn = useModal().setState.setModalOn;
//     useEffect(() => {
//       const ACCESS_TOKEN = localStorage.getItem('access_token');
//       if (!ACCESS_TOKEN) {
//         history.push('/');
//         setModalOn('signin');
//       }
//     }, [history]);
//   };