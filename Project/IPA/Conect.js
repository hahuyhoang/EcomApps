export const BASE_URL = "https://3e4c-2402-800-613e-2a2e-8908-58e0-7284-5797.ap.ngrok.io/api";

export const getApiUrl = (endpoint) => BASE_URL + endpoint;

export const LOGIN = getApiUrl("/login");
export const SIGNUP = getApiUrl("/register");
export const VERIFY = getApiUrl("/check-register-code");
export const PRODUCT = getApiUrl("/products/list");
export const CATEGORIES = getApiUrl("/categories/list");
export const BRAND = getApiUrl("/brand/list");
export const BESTSELLING = getApiUrl("/products/best-selling?page=1");
export const EXCLUSIVE = getApiUrl("/products/exclusive-offer?page=1");
export const SEARCH = getApiUrl("/products/filter-search?textSearch?page=1");
export const UPDATE_USER = getApiUrl("/user/update");
export const AVATAR_USER = getApiUrl("/user/avatar");
export const ORDERS = getApiUrl("/orders");
export const GETORDERS = getApiUrl("/orders");
