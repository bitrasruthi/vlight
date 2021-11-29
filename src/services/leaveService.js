import http from './httpService';



const apiEndPointEmp = '/employee/applyleave';
const apiEndPointAdmin = '/admin/allleaves';


// export function checkOut(user) {
//     return http.post(apiEndPoint, {outTime: user});
//   }


  export function getLeaves() {
    return http.get(apiEndPointAdmin);
   }