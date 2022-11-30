export const BASE_URL = "https://737b-2402-800-613e-7abe-50f9-1c3f-5a74-dcab.ap.ngrok.io/api";

export const getApiUrl = (endpoint) => BASE_URL + endpoint

export const LOGIN = getApiUrl('/login');
export const SIGNUP = getApiUrl('/register');
export const VERIFY = getApiUrl('/check-register-code');
export const PRODUCT = getApiUrl('/products/list')
export const CATEGORIES = getApiUrl('/categories/list')
export const BRAND = getApiUrl('/brand/list')
export const BESTSELLING = getApiUrl('/products/best-selling?page=1')
export const EXCLUSIVE = getApiUrl('/products/exclusive-offer?page=1')