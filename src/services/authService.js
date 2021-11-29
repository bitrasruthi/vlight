import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/admin/login";

const tokenKey = "token";

// http.setJwt(getJwt());

export async function login(AdminId, Password) {
  const { data: jwt } = await http.post(apiEndPoint, { AdminId, Password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  return localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  return localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const dd = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
export default dd;
