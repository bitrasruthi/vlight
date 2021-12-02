import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "http://cghrportal.herokuapp.com/api/admin/holidays";

function atturl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getholidays(empid) {
  return http.get(atturl(empid));
}
