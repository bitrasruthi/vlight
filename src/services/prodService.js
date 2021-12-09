import http from "./httpService";
import jwtDecode from "jwt-decode";


const apiEndPointProd = "http://cghrportal.herokuapp.com/api/admin/productionhours";
const empprohrs = "http://cghrportal.herokuapp.com/api/employee/productionhours/week&month";
const tokenkey = "token";

export function getJwt() {
  return localStorage.getItem(tokenkey);
}
http.setJwt(getJwt());

export function calProdHours(user) {
  return http.post(apiEndPointProd, {
    EmployeeId: user.EmployeeId,
    from_Date: user.from_Date,
    to_Date: user.to_Date
  });
}

export function getCal() {
    return http.get(apiEndPointProd);

}
export function getemppro() {
    return http.post(empprohrs);

}

  

  const pro = {
     calProdHours
  }

  export default pro;