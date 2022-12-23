import {
  CATEGORIES,
  LOGIN,
  PRODUCT,
  SIGNUP,
  VERIFY,
  BRAND,
  BESTSELLING,
  EXCLUSIVE,
  SEARCH,
  UPDATE_USER,
  AVATAR_USER,
  ORDERS,
  GETORDERS,
} from "../../IPA/Conect";
import { showError } from "../../utils/helperFunction";
import {
  apiGet,
  apiPost,
  clearUserData,
  setBestselling,
  setCategory,
  setSearch,
  setProduct,
  setUserData,
  setUserVeri,
  setUpdateUser,
  setAvatarUser,
  setListOrders,
  getBrand,
  setBrand
} from "../../utils/utils";
import store from "../store";
import types from "../types";
const { dispatch } = store;

export const saveUserData = (data) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};
export const saveUserVeri = (data) => {
  dispatch({
    type: types.SIGNUP,
    payload: data,
  });
};
export const saveProDuct = (data) => {
  dispatch({
    type: types.PRODUCT,
    payload: data,
  });
};
export const saveSearch = (data) => {
  dispatch({
    type: types.SEARCH,
    payload: data,
  });
};
export const saveCategory = (data) => {
  dispatch({
    type: types.CATEGORIES,
    payload: data,
  });
};
export const saveBestSelling = (data) => {
  dispatch({
    type: types.BEST_SELLING,
    payload: data,
  });
};
export const saveUpdateUser = (data) => {
  dispatch({
    type: types.UPDATE_USER,
    payload: data,
  });
};
export const saveAvatarUser = (data) => {
  dispatch({
    type: types.UPDATE_USER,
    payload: data,
  });
};
export const saveListOrder = (data) => {
  dispatch({
    type: types.GETORDERS,
    payload: data,
  });
};

export function login(data) {
  return new Promise((resolve, reject) => {
    return apiPost(LOGIN, data)
      .then((res) => {
        if (res.user.email_verified_at) {
          setUserData(res).then(() => {
            resolve(res);
            saveUserData(res);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signup(datas) {
  return new Promise((resolve, reject) => {
    return apiPost(SIGNUP, datas)
      .then((res) => {
        if (res.user) {
          setUserVeri(res).then(() => {
            resolve(res);
            saveUserVeri(res);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function verify(data) {
  return apiPost(VERIFY, data);
}

export function product(data) {
  return new Promise((resolve, reject) => {
    return apiGet(PRODUCT, data)
      .then((res) => {
        const items = res.list_product.data;
        items.forEach((element) => {
          // console.log('aaaaaaaaasaa', element);
        });

        if (res.list_product) {
          setProduct(res).then(() => {
            resolve(res);
            saveProDuct(res);
          });
          return;
        }
        resolve(res);
        // console.log(res);
      })
      .catch((error) => {
        console.log("loi", error);
        reject(error);
        console.log("aaaaaaaaasaa", element);
      });
  });
}
export function Categories(data) {
  return new Promise((resolve, reject) => {
    return apiGet(CATEGORIES, data)
      .then((res) => {
        if (res.list_category) {
          setCategory(res).then(() => {
            resolve(res);
            saveCategory(res);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        console.log("loi", error);
        reject(error);
      });
  });
}
export function brand(data) {
  return new Promise((resolve, reject) => {
    return apiGet(BRAND, data)
      .then((res) => {
        if (res.list_brand) {
          setBrand(res).then(() => {
            resolve(res);
            getBrand(res);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        console.log("loi", error);
        reject(error);
      });
  });
}

export function bestselling(data) {
  return new Promise((resolve, reject) => {
    return apiGet(BESTSELLING, data)
      .then((res) => {
        // console.log("best",res.list_product.data);
        if (res.list_product) {
          setBestselling(res.list_product).then(() => {
            resolve(res.list_product);
            saveBestSelling(res.list_product);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        console.log("loi", error);
        reject(error);
      });
  });
}

export function exclusive(data) {
  return new Promise((resolve, reject) => {
    return apiGet(EXCLUSIVE, data)
      .then((res) => {
        // console.log("best", res.list_product.data);
        if (res.list_product) {
          setBestselling(res.list_product).then(() => {
            resolve(res.list_product);
            saveBestSelling(res.list_product);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        console.log("loi", error);
        reject(error);
      });
  });
}

export function search(data) {
  return new Promise((resolve, reject) => {
    return apiGet(SEARCH, data)
      .then((res) => {
        if (res.list_product) {
          saveSearch(res).then(() => {
            resolve(res);
            setSearch(res);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        console.log("loi", error);
        reject(error);
      });
  });
}
export function update_user(data) {
  return new Promise((resolve, reject) => {
    return apiPost(UPDATE_USER, data)
      .then((res) => {
        if (res.user) {
          setUpdateUser(res).then(() => {
            resolve(res);
            saveUpdateUser(res);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function avatar_user(data) {
  return new Promise((resolve, reject) => {
    return apiPost(AVATAR_USER, data)
      .then((res) => {
        if (res.user) {
          setAvatarUser(res).then(() => {
            resolve(res);
            saveAvatarUser(res);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function logout() {
  dispatch({ type: types.CLEAR_REDUX_STATE });
  clearUserData();
}
export function orders(data) {
  return apiPost(ORDERS, data);
}
export function getOrders(data) {
  return new Promise((resolve, reject) => {
    return apiGet(GETORDERS, data)
      .then((res) => {
        if (res.list_order) {
          setListOrders(res.list_order).then(() => {
            resolve(res.list_order);
            saveBestSelling(res.list_order);
          });
          return;
        }
        resolve(res);
      })
      .catch((error) => {
        console.log("loi", error);
        reject(error);
      });
  });
}
