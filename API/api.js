// Base url API
export const BASE_URL =
  process.env["BASE_URL"] || "http://192.168.43.192:5000/api/";
// endpoint API
export const LOGIN = BASE_URL + "User/login";
export const REGISTER = BASE_URL + "User/create";
export const GETPROFILEDATA = BASE_URL + "User/get-user-by-id/25?id=userId";
export const DELETE_ITEM = BASE_URL + "Cart/delete/";
export const DELETE_ALL_ITEM = BASE_URL + "Cart/delete-all/userId";
export const GET_ALL_CART_DATA = BASE_URL + "Cart/get-all";
export const GET_CART_WITH_PAGE = BASE_URL + "Cart/get-all-with-page?";
export const GET_ALL_PRODUCT = BASE_URL + "Product/get-all";
export const GET_ALL_ORDER = BASE_URL + "Order/get-all";
export const GET_ORDER_WITH_PAGE = BASE_URL + "Order/get-all-with-page?";
export const CREATE_ORDER = BASE_URL + "Order/create";
export const CANCEL_ORDER = BASE_URL + "Order/cancel/";
export const USERCONFIRM_ORDER = BASE_URL + "Order/user-confirm/";
export const ADMINCONFIRM_ORDER = BASE_URL + "Order/admin-confirm/";

export const GET_USER_ORDER = BASE_URL + "Order/get-bill";
export const CREATE_CART = BASE_URL + "Cart/create";
export const UPDATE_CART = BASE_URL + "Cart/update/quantity/";
export const GET_PRODUCT_WITH_PAGE = BASE_URL + "Product/get-all-with-page?";
export const CHANGE_PASSWORD = BASE_URL + "User/update";
export const UPDATE_USER = BASE_URL + "User/update-user";
export const DELETE_USER = BASE_URL + "User/deleted-user/";
export const GET_ALL_USER = BASE_URL + "User/get-all";
export const GET_SHIP_FEE = BASE_URL + "Order/ship/fee";

export default {
  LOGIN,
  BASE_URL,
  REGISTER,
  UPDATE_CART,
  GETPROFILEDATA,
  DELETE_ITEM,
  DELETE_ALL_ITEM,
  GET_ALL_CART_DATA,
  GET_CART_WITH_PAGE,
  GET_ALL_PRODUCT,
  CREATE_ORDER,
  CREATE_CART,
  GET_PRODUCT_WITH_PAGE,
  GET_ALL_ORDER,
  GET_ORDER_WITH_PAGE,
  CHANGE_PASSWORD,
  UPDATE_USER,
  GET_USER_ORDER,
};
