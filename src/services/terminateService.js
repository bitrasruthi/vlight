import http from "./httpService";
import jwtDecode from "jwt-decode";


const apiEndPointTerminate = "http://cghrportal.herokuapp.com/api/admin/get/getemployeetermination";
const apiEndPointTerminate1 = "http://cghrportal.herokuapp.com/api/admin/post/employeetermination";

const tokenkey = "token";
// function atturl(id) {
//     return `${apiEndPointProGet}/${id}`;
//   }

export function getJwt() {
  return localStorage.getItem(tokenkey);
}
http.setJwt(getJwt());

export function terminateEmp(user) {
  return http.post(apiEndPointTerminate1, {
    EmployeeId: user.EmployeeId,
    Reason: user.Reason,
    AgreementDone: user.AgreementDone,
    
  });
}

export  function getTerminateEmpDetails(skip) {
   return http.post(apiEndPointTerminate,{skip:skip});
    
  }
  
  

  const pro = {
      terminateEmp,
      getJwt,
      getTerminateEmpDetails
  }

  export default pro;