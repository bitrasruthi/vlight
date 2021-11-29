import http from './httpService';



const apiEndPoint = '/employee/outTime';


export function checkOut(user) {
    return http.post(apiEndPoint, {outTime: user});
  }


  export function getUsers() {
    return http.get(apiEndPoint);
   }