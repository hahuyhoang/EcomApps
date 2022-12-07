export const BASE_URL = "https://3d1d-2402-800-613e-7abe-91c6-c214-87f6-d1e3.ap.ngrok.io/api";

export const getApiUrl = (endpoint) => BASE_URL + endpoint;

export const LOGIN = getApiUrl('/login');
export const SIGNUP = getApiUrl('/register');
export const VERIFY = getApiUrl('/check-register-code');
export const PRODUCT = getApiUrl('/products/list')
export const CATEGORIES = getApiUrl('/categories/list')
export const BRAND = getApiUrl('/brand/list')
export const BESTSELLING = getApiUrl('/products/best-selling?page=1')
export const EXCLUSIVE = getApiUrl('/products/exclusive-offer?page=1')
export const FILTER = getApiUrl('/products/filter-search?textSearch?page=1')
export const UPDATE_USER = getApiUrl('/user/update')
export const ORDERS = getApiUrl('/orders')
