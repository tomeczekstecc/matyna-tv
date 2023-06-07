import {makeUseAxios} from "axios-hooks";
import axios from "axios";


export const AxiosCloudinary = (() => {
  const instance = axios.create({
    baseURL: process.env.BASE_CLOUDINARY_URL,
  });

  instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Basic  ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_SECRET_KEY).toString('base64')}`
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status) {

        return error.response;

      } else {
        return instance;
      }
    }
  );
  return instance;
})();

const useAxiosCloudinary = makeUseAxios({
  axios: AxiosCloudinary,
  cache: false,
});

export const Axios = (() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    instance.interceptors.request.use((config) => {
      config.headers["X-Requested-With"] = "XMLHttpRequest";
      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status) {

          return error.response;

        } else {
          return instance;
        }
      }
    );
    return instance;
  }
)();

export default useAxiosCloudinary;
