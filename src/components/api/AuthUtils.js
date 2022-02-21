import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get("authorization");
export const getTenant = () => Cookies.get("tenant");
