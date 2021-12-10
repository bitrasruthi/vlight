import http from "./httpService";
import jwtDecode from "jwt-decode";


const apiEndPointTerminate = "http://cghrportal.herokuapp.com/api/admin/employeetermination";

const tokenkey = "token";
// function atturl(id) {
//     return `${apiEndPointProGet}/${id}`;
//   }

export function getJwt() {
  return localStorage.getItem(tokenkey);
}
http.setJwt(getJwt());

export function terminateEmp(user) {
  return http.post(apiEndPointTerminate, {
    EmployeeId: user.EmployeeId,
    Reason: user.Reason,
    AgreementDone: user.AgreementDone,
    
  });
}

export  function getTerminateEmpDetails() {
   return http.get(apiEndPointTerminate);
    
  }
  
  

  const pro = {
      terminateEmp,
      getJwt,
      getTerminateEmpDetails
  }

  export default pro;