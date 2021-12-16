import http from "./httpService";


// const apiEndPointPro = "http://cghrportal.herokuapp.com/api/employee/profile";
const apiEndPointJob = "http://cghrportal.herokuapp.com/api/employee/post/add/jobExperiences";

const tokenkey = "token";


export function getJwt() {
  return localStorage.getItem(tokenkey);
}
http.setJwt(getJwt());

export function registerJobDetails(user) {
  return http.post(apiEndPointJob, {
    companyName: user.companyName,
    Experience: user.Experience,
    Role: user.Role,
    from_upto: user.from_upto,
  
  });
}

export async function getJobDetails(data) {
    const { data: ser } = await http.post(apiEndPointJob, data);
    return ser;
  }
  
  

  const pro = {
      getJobDetails,
      getJwt,
      registerJobDetails
  }

  export default pro;