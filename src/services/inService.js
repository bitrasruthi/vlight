import http from './httpService';



const apiEndPoint = '/employee/inTime';

function atturl(id) {
  return `${apiEndPoint}/${id}`;
}


export function checkIn(user) {
    return http.post(apiEndPoint, {inTime: user});
  }


  export function getCheck(id) {
    return http.get(atturl(id));
   }