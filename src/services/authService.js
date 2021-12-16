import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/admin/post/login";
const apiEndPointdelete = 'http://cghrportal.herokuapp.com/api/admin/post/removeemployee'
const tokenKey = "token";

// http.setJwt(getJwt());

export async function login(Email, Password) {
  const { data: jwt } = await http.post(apiEndPoint, { Email, Password });
  localStorage.setItem(tokenKey, jwt);
}


function atturl(empid) {
  return `${apiEndPointdelete}/${empid}`;
}

export function deleteEmp(empid) {
  console.log(empid)
  return http.delete(atturl(empid));
}


export function loginWithJwt(jwt) {
  return localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem('id');
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
