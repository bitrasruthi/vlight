import http from "./httpService";
import jwtDecode from "jwt-decode";


const apiEndPointEduUpdate = "http://cghrportal.herokuapp.com/api/employee/updateEducationalDetails";
const apiEndPointEdu = "http://cghrportal.herokuapp.com/api/employee/add/EducationalDetails";

const tokenkey = "token";


function atturl(name) {
  return `${apiEndPointEduUpdate}/${name}`;
}

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

export async function updateEduDetails(data) {
 return await http.post(atturl(data.qualification));

    // return ser;
  }
  
  

  const pro = {
      updateEduDetails,
      getJwt,
      registerEduDetails
  }

  export default pro;