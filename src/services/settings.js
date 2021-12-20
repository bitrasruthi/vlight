import http from "./httpService";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/admin/post/holidays";
const apiEndPointget = "http://cghrportal.herokuapp.com/api/admin/get/holidays";
const apiEndPointsave = "http://cghrportal.herokuapp.com/api/admin/get/companytimings";
const apiEndPointsave1 = "http://cghrportal.herokuapp.com/api/admin/post/settings";

// function atturl(id) {
//   return `${apiEndPoint}/${id}`;
// }

export async function save(data) {
  return await http.post(apiEndPointsave1, data);
}

export async function gettime() {
  const { data:time} =  await http.get(apiEndPointsave);
  return time;
}

export  async function getholidays() {
  return await http.get(apiEndPointget);
}
export async  function postholidays(data) {
  const { data: sett}  = await http.post(apiEndPoint,{ holidays : [data]});
  return sett
}
