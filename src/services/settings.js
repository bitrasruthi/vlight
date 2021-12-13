import http from "./httpService";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/admin/holidays";
const apiEndPointsave = "http://cghrportal.herokuapp.com/api/admin/settings";

// function atturl(id) {
//   return `${apiEndPoint}/${id}`;
// }

export async function save(data) {
  return await http.post(apiEndPointsave, data);
}

export async function gettime() {
  const { data:time} =  await http.get(apiEndPointsave);
  return time;
}

export  async function getholidays() {
  return await http.get(apiEndPoint);
}
export async  function postholidays(data) {
  const { data: sett}  = await http.post(apiEndPoint,{ holidays : [data]});
  return sett
}
