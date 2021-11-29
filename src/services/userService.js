import http from "./httpService";

const apiEndPointPost = "http://cghrportal.herokuapp.com/api/admin/addemployee";
const apiEndPointGet = "http://cghrportal.herokuapp.com/api/admin/getall";

const tokenkey = "token";

export function getJwt() {
  return localStorage.getItem(tokenkey);
}
http.setJwt(getJwt());

export function register(user) {
  return http.post(apiEndPointPost, {
    EmployeeId: user.EmployeeId,
    EmployeeName: user.EmployeeName,
    Email: user.Email,
    Phone: user.Phone,
    DateOfBirth: user.DateOfBirth,
    Role: user.Role,
    NetSalary: user.NetSalary,
  });
}

export function getEmployees() {
  return http.get(apiEndPointGet);
}
