import React from "react";
import Admin from "./layouts/Admin";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Logins/Login";
import { Provider } from "react-redux";
import store from "./reduxstore/store";
import ELogin from "./components/Logins/eLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Authy from "layouts/Auth";
import AddNew from "./components/Admin Files/addNewEmp";
import NavBar from "./components/Common/navbar";
import Logout from "./components/Logins/logout";
import EmpList from "./components/Admin Files/emplist";
import Dashboard from "components/Common/dashboard";
import Footer from "components/Footers/AdminFooter";
import EDashboard from "./components/Common/edashboard";
import TimeCard from "components/Employee Files/timecard";
import AttList from "./components/Employee Files/myattendance";
import LeaveList from "./components/Admin Files/leavelist";
import LeaveForm from "./components/Employee Files/leaveform";
import ELeaveList from "./components/Employee Files/eleavelist";
import ApproveReject from "./components/Admin Files/approvereject";
import Register from "./components/Logins/register";
import Countdown from "./components/Logins/countdown";
import EmpAttList from "components/Admin Files/empAttList";
import Holidays from "components/Admin Files/holidays";
import OfficeHours from "components/Admin Files/officeHours";
import EmpOptions from './components/Admin Files/empOptions';
import Profile from './components/Employee Files/profile';
import ProfileDetails from './components/Employee Files/profileDetails';
import ChangePassword from './components/Employee Files/changePassword';
import EmpWorkingStas from './components/Admin Files/empWorkingStats';
import ProtectedRoute from "components/Common/protectedRoute";
import EmpProtectedRoute from "components/Common/empprotectedRoute";
import EduDetails from './components/Employee Files/eduDetails';
import JobDetails from './components/Employee Files/jobDetails';
import PopUp from './components/Admin Files/popUp';
import PopupMess from './components/Admin Files/popupmess';
class App extends React.Component {
  render() {
    return (
      
        <Provider store={store}>
          <React.Fragment>
            <ToastContainer />

            <main className="container">
              <Switch>
                {/* <Route path="/notready" component={NotFound} /> */}
                <Route path="/elogin" component={ELogin} />
                <Route path="/register" component={Register} />
                <ProtectedRoute path="/addnewemp" component={AddNew} />
                <ProtectedRoute path="/emplist" component={EmpList} />
                <ProtectedRoute path="/leavelist" component={LeaveList} />
                <Route path="/logout" component={Logout} />
                <Route path="/changepassword" component={ChangePassword} />
                <Route path="/empstats" component={EmpWorkingStas} />
                <Route path="/edudetails" component={EduDetails} />
                <Route path="/popup" component={PopupMess} />
                
                <Route path="/jobdetails" component={JobDetails} />

                <Route path="/navbar" component={NavBar} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <EmpProtectedRoute path="/edashboard" component={EDashboard} />
                <Route path="/countdown" component={Countdown} />
                <EmpProtectedRoute path="/timecard" component={TimeCard} />
                <EmpProtectedRoute path="/attlist" component={AttList} />
                <EmpProtectedRoute path="/leaveform" component={LeaveForm} />
                <EmpProtectedRoute path="/eleavelist" component={ELeaveList} />
                <ProtectedRoute path="/leaveapproval/:id" component={ApproveReject} />
                <ProtectedRoute path="/empattlist/:id" component={EmpAttList} />
                <ProtectedRoute path="/holidays" component={Holidays} />
                <ProtectedRoute path="/officehours" component={OfficeHours} />
                <Route path="/empoptions" component={EmpOptions} />
                <Route path="/profile" component={Profile} />

                <Route path="/" component={Login} />
                <Redirect from="/" exact to="/home" />
                <Redirect to="/not-found" />

                {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
                {/* <Route path="/auth" render={(props) => <AuthLayout {...props} />} /> */}
              </Switch>
              {/* <Footer /> */}
            </main>
          </React.Fragment>
        </Provider>
      
    );
  }
}

export default App;
