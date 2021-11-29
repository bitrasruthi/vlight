import React from 'react';
import Admin from './layouts/Admin';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'views/examples/Login';
import {Provider} from 'react-redux'
import store from "./reduxstore/store";
import ELogin from './components/Logins/eLogin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './components/Sidebar/Sidebar';
import Authy from 'layouts/Auth';
import AddNew from './components/Admin Files/addNewEmp';
import NavBar from './components/Common/navbar';
import Logout from './components/Logins/logout';
import EmpList from './components/Admin Files/emplist';
import  Dashboard  from 'components/Common/dashboard';
import Footer  from 'components/Footers/AdminFooter';

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
            <Route path="/addnewemp" component={AddNew} /> 
            <Route path="/emplist" component={EmpList} /> 
            <Route path="/logout" component={Logout} /> 

            <Route path="/navbar" component={NavBar} /> 
            <Route path="/dashboard" component={Dashboard} /> 
            <Route path="/" component={Login} />
            <Redirect from="/" exact to="/home" />
                <Redirect to="/not-found" />



             {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
      {/* <Route path="/auth" render={(props) => <AuthLayout {...props} />} /> */}
      </Switch>
      <Footer/>
            </main>
            </React.Fragment>
            </Provider>
            </div>
        );
    }
}
 
export default App;