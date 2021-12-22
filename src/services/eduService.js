import http from "./httpService";


const apiEndPointEduUpdate = "http://cghrportal.herokuapp.com/api/employee/post/updateEducationalDetails";
const apiEndPointEdu = "http://cghrportal.herokuapp.com/api/employee/add/post/EducationalDetails";

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
   const {data:ser}= await http.post(atturl(data.qualification), data);
    return ser;
  }
  
  

  const pro = {
      updateEduDetails,
      getJwt,
      registerEduDetails
  }

  export default pro;