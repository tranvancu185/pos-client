import axios, { CancelToken } from 'axios';
import { WS_URL, API_TOKEN_KEY } from 'src/web.config';
// import { logging, sendMessage } from 'src/utils/logger';

const instance = axios.create({
  baseURL: WS_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    // "Authorization": `Bearer ${localStorage.getItem(API_TOKEN_KEY) ?? ''}`
  },
  validateStatus: (status) => {
    return true; // I'm always returning true, you may want to do it depending on the status received
  },
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem(API_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
  },
  (error) => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      alert('timeout');
    }
    return Promise.reject(error);
  },
);

// remove field null
const clean = (obj) => {
  if (!obj) {
    return obj;
  }
  let data = { ...obj };
  for (var propName in data) {
    if (data[propName] === null || data[propName] === undefined) {
      delete data[propName];
    }
  }
  return JSON.stringify(data) === '{}' ? null : data;
};

const axiosRequest = (options) => {
  const data = clean(options.data);
  const params = clean(options.params);
  const source = CancelToken.source();
  const promise = new Promise((resolve, reject) => {
    instance({
      ...options,
      data,
      params,
      cancelToken: source.token,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          // logging({ raw: options, message: 'Request timeout, please try again or contact to IT!', functionName: options.url });
          if (!options.url.includes('telegram')) {
            // sendMessage({ raw: options, message: 'Request timeout, please try again or contact to IT!', functionName: options.url });
            alert('Request timeout, please try again or contact to IT!');
          }
        }
        reject(error);
      });
  });
  // promise[CANCEL] = () => source.cancel();
  return promise;
};

export const multipart = (url, form_data) => {
  const source = CancelToken.source();
  const promise = new Promise((resolve, reject) => {
    instance
      .post(url, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
  // promise[CANCEL] = () => source.cancel();
  return promise;
};

export default axiosRequest;
