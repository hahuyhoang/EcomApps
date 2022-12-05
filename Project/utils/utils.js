import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import types from "../redux/types";

const { dispatch, getState } = store;

export async function getHeaders() {
  let userData = await AsyncStorage.getItem("userData");
  // console.log("user ne =>>", token);
  if (userData) {
    userData = JSON.parse(userData);
    return {
      authorization: `Bearer ${userData.token}`,
    };
  }
  return {};
}

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {}
) {
  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();
    headers = {
      ...getTokenHeader,
      ...headers,
    };

    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, { headers })
      .then((result) => {
        const { data } = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error && error.response, "the error respne");
        if (error && error.response && error.response.status === 401) {
          clearUserData();
          dispatch({
            type: types.CLEAR_REDUX_STATE,
            payload: {},
          });
          dispatch({
            type: types.NO_INTERNET,
            payload: { internetConnection: true },
          });
        }
        if (error && error.response && error.response.data) {
          if (!error.response.data.message) {
            return rej({
              ...error.response.data,
              msg: error.response.data.message || "Network Error",
            });
          }
          return rej(error.response.data);
        } else {
          return rej({ message: "Network Error", msg: "Network Error" });
        }
        return rej(error);
      });
  });
}
export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "delete", headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}

export function setItem(key, data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key).then((data) => {
      resolve(JSON.parse(data));
    });
  });
}

export function removeItem(key) {
  return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
  return AsyncStorage.clear();
}

export function setUserData(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("userData", data);
}
export function setUpdateUser(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("updateUser", data);
}


export function setUserVeri(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("userData", data);
}
export async function getUserData() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("userData").then((data) => {
      resolve(JSON.parse(data));
    });
  });
}
export function setCategory(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("categories", data);
}

export async function getCategory() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("categories").then((data) => {
      resolve(JSON.parse(data));
    });
  });
}
export function setProduct(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("Product", data);
}

export async function getProduct() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("Product").then((data) => {
      resolve(JSON.parse(data));
    });
  });
}

export function setBestselling(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("bestselling", data);
}
export async function getBestselling() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("bestselling").then((data) => {
      resolve(JSON.parse(data));
    });
  });
}
export function setExclusive(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("exclusive", data);
}
export async function getExclusive() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("exclusive").then((data) => {
      resolve(JSON.parse(data));
    });
  });
}
export function setFilter(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("exclusive", data);
}
export async function getFilter() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("exclusive").then((data) => {
      resolve(JSON.parse(data));
    });
  });
}
export async function clearUserData() {
  return AsyncStorage.removeItem("userData");
}
