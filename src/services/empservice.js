import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/employee/login";

const apiEndPointatt = "http://cghrportal.herokuapp.com/api/employee";

const apiEndPointchange =
  "http://cghrportal.herokuapp.com/api/employee/changepassword";

const apiEndPointlogout = "http://cghrportal.herokuapp.com/api/employee/logout";

const getAttendanceser =
  "http://cghrportal.herokuapp.com/api/admin/attendancestats";

const tokenKey = "token";

// http.setJwt(getJwt());

function atturl(id) {
  return `${apiEndPointatt}/${id}`;
}
function logurl(id) {
  return `${apiEndPointlogout}/${id}`;
}

export async function login(Email, Password) {
  const { data: jwt } = await http.post(apiEndPoint, { Email, Password });
  localStorage.setItem(tokenKey, jwt.token);
  return jwt;
}

export async function changepassword(data) {
  const { data: jwt } = await http.post(apiEndPointchange, {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
    conformPassword: data.conformPassword,
  });
  return jwt;
}

export function getAttendance(empid) {
  return http.get(atturl(empid));
}


export async function getAttendanceserc(data) {
  const { data: ser } = await http.post(getAttendanceser, data);
  return ser;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout(empid) {
  localStorage.removeItem(tokenKey);
  return http.post(logurl(empid));
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

const emp = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  getAttendance,
  changepassword,
  getAttendanceserc,
};
export default emp;
