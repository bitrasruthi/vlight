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

// export async function getProDetails(data) {
//     const { data: ser } = await http.post(apiEndPointProGet, data);
//     return ser;
//   }
  
  

  const pro = {
      terminateEmp,
      getJwt,
  }

  export default pro;