import http from "./httpService";
import jwtDecode from "jwt-decode";


const apiEndPointPro = "http://cghrportal.herokuapp.com/api/employee/profile";
const apiEndPointProGet = "http://cghrportal.herokuapp.com/api/employee/details";

const tokenkey = "token";
function atturl(id) {
    return `${apiEndPointProGet}/${id}`;
  }

export function getJwt() {
  return localStorage.getItem(tokenkey);
}
http.setJwt(getJwt());

export function profileRegister(user) {
  return http.post(apiEndPointPro, {
    FirstName: user.FirstName,
    MiddleName: user.MiddleName,
    LastName: user.LastName,
    Address: user.Address,
    City: user.City,
    Country: user.Country,
    Pincode: user.Pincode,
    AboutMe: user.AboutMe,
    EducationDetails: user.EducationDetails,
  });
}

export async function getProDetails(data) {
    const { data: ser } = await http.post(apiEndPointProGet, data);
    return ser;
  }
  
  

  const pro = {
      getProDetails,
      getJwt,
      profileRegister
  }

  export default pro;