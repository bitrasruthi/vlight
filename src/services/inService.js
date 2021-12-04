import http from './httpService';



const apiEndPoint = '/employee/inTime';

function atturl(id) {
  return `${apiEndPoint}/${id}`;
}


export  async function checkIn(user) {
    const res =  await http.post(apiEndPoint, {inTime: user});
    return res
    
  }


  export function getCheck(id) {
    return http.get(atturl(id));
   }