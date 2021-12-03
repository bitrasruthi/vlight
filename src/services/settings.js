import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/admin/holidays";
const apiEndPointsave = "http://cghrportal.herokuapp.com/api/admin/settings";

function atturl(id) {
  return `${apiEndPoint}/${id}`;
}

export async function save(data) {
  return await http.post(apiEndPointsave, data);
}

export async function gettime() {
  const { data:time} =  await http.get(apiEndPointsave);
  return time;
}

export function getholidays(empid) {
  return http.get(apiEndPoint);
}
export async  function postholidays(data) {
  const { data: sett}  = await http.post(apiEndPoint,{ holidays : [data]});
  return sett
}
