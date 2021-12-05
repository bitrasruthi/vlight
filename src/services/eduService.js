import http from "./httpService";
import jwtDecode from "jwt-decode";


// const apiEndPointPro = "http://cghrportal.herokuapp.com/api/employee/profile";
const apiEndPointEdu = "http://cghrportal.herokuapp.com/api/employee/EducationalDetails";

const tokenkey = "token";


export function getJwt() {
  return localStorage.getItem(tokenkey);
}
http.setJwt(getJwt());

export function registerEduDetails(user) {
  return http.post(apiEndPointEdu,  {
    qualification: user.qualification,
    institute: user.institute,
    passedoutYear: user.passedoutYear,
    percentage: user.percentage,
  
  });
}

export async function getEduDetails(data) {
    const { data: ser } = await http.post(apiEndPointEdu, data);
    return ser;
  }
  
  

  const pro = {
      getEduDetails,
      getJwt,
      registerEduDetails
  }

  export default pro;