import http from "./httpService";

const apiEndPointPost = "http://cghrportal.herokuapp.com/api/admin/addemployee";
const apiEndPointGet = "http://cghrportal.herokuapp.com/api/admin/getall";
const apiEndPointReg = "/admin/registerhr"
const prohtslink  = 'http://cghrportal.herokuapp.com/api/admin/productionhours/week&month'

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
    AgreementYears: user.AgreementYears,
  });
}


// export function register(user) {
//   return http.post(apiEndPointReg, {email: user.email, password: user.password, name: user.username});
// }


export function registerAdmin(user) {
  return http.post(apiEndPointReg, {
    
    Name: user.Name,
    Email: user.Email,
    Password: user.Password,
    organisation: user.organisation,
  });
}


export function getEmployees(skip) {
  return http.post(apiEndPointGet,{skip:skip});
}
export function getProHrs() {
  return http.post(prohtslink);
}


export function deleteEmployees(EmployeeId){
  return http.delete(apiEndPointGet + '/' + EmployeeId);
}
