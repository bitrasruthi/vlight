import http from "./httpService";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/admin/post/holidays";
const apiEndPointget = "http://cghrportal.herokuapp.com/api/admin/get/holidays";
const apiEndPointgetoff = "http://cghrportal.herokuapp.com/api/admin/get/companytimings";
const apiEndPointsave1 = "http://cghrportal.herokuapp.com/api/admin/post/companytimings";
const apiEndPointpostd = "http://cghrportal.herokuapp.com/api/admin/post/companydetails";
const apiEndPointgetcomdet = "http://cghrportal.herokuapp.com/api/admin/get/companydetails";
const deletehoild = "";

// function atturl(id) {
//   return `${apiEndPoint}/${id}`;
// }

export async function save(data) {
  return await http.post(apiEndPointsave1, data);
}
export async function deletehoil(data) {
  console.log(data)
  // return await http.post(deletehoild, data);
}

export async function gettime() {
  const { data:time} =  await http.get(apiEndPointgetoff);
  return time;
}

 export async function addcompdet(data1) {
  const { data} =  await http.post(apiEndPointpostd,data1);
  return data;
}
 export async function getcomdet() {
  const { data} =  await http.get(apiEndPointgetcomdet);
  return data;
}

export  async function getholidays() {
  return await http.get(apiEndPointget);
}
export async  function postholidays(data) {
  const { data: sett}  = await http.post(apiEndPoint,{ holidays : [data]});
  return sett
}
