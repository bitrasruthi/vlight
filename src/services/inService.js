import http from './httpService';



const apiEndPoint = '/employee/inTime';


export function checkIn(user) {
    return http.post(apiEndPoint, {inTime: user});
  }


  export function getUsers() {
    return http.get(apiEndPoint);
   }