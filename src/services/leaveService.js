import http from "./httpService";

const apiEndPointEmp = "http://cghrportal.herokuapp.com/api/employee/post/applyleave";
const apiEndPointEmpleaves = "http://cghrportal.herokuapp.com/api/employee/get/getleaves";
const apiEndPointAdmin = "http://cghrportal.herokuapp.com/api/admin/get/allleaves";
const apiEndPointAdminsta = "http://cghrportal.herokuapp.com/api/admin/post/leavestatus";

// export function checkOut(user) {
//     return http.post(apiEndPoint, {outTime: user});
//   }

export async function applyLeave(data) {
  const { data: jwt } = await http.post(apiEndPointEmp, {
    from_Date: data.from_Date,
    to_Date: data.to_Date,
    subject: data.subject,
    reason: data.reason,
    leave_type: data.leave_type,
    To: data.To,
  });

  return jwt;
}

export async function leavestatus(data) {
  return await http.post(apiEndPointAdminsta, {
    _id: data._id,
    status: data.status
  });
}

export function getLeaves(skip1) {
  
  return http.post(apiEndPointAdmin,{skip:skip1});
}

export function getempLeaves(skip1) {
  return http.post(apiEndPointEmpleaves,{skip:skip1});
}
