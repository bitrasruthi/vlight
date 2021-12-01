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

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <React.Fragment>
            <ToastContainer />

            <main className="container">
              <Switch>
                {/* <Route path="/notready" component={NotFound} /> */}
                <Route path="/elogin" component={ELogin} />
                <Route path="/register" component={Register} />
                <Route path="/addnewemp" component={AddNew} />
                <Route path="/emplist" component={EmpList} />
                <Route path="/leavelist" component={LeaveList} />
                <Route path="/logout" component={Logout} />

                <Route path="/navbar" component={NavBar} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/edashboard" component={EDashboard} />
                <Route path="/countdown" component={Countdown} />
                <Route path="/timecard" component={TimeCard} />
                <Route path="/attlist" component={AttList} />
                <Route path="/leaveform" component={LeaveForm} />
                <Route path="/eleavelist" component={ELeaveList} />
                <Route path="/leaveapproval/:id" component={ApproveReject} />
                <Route path="/empattlist/:id" component={EmpAttList} />

                <Route path="/" component={Login} />
                <Redirect from="/" exact to="/home" />
                <Redirect to="/not-found" />

                {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
                {/* <Route path="/auth" render={(props) => <AuthLayout {...props} />} /> */}
              </Switch>
              <Footer />
            </main>
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}

export default App;
