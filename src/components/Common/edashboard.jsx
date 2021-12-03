import Footer from 'components/Footers/AdminFooter';
import ESidebar from 'components/Sidebar/eSidebar';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import ENavBar from './enavbar';
import get_employeelist from 'reduxstore/actions/employeeAction';
import TimeCard from 'components/Employee Files/timecard';

class EDashboard extends React.Component {
    render() { 
        return <div>
            <ESidebar/>
            <ENavBar/>            
            <TimeCard/>
        </div>;
    }
}
 
export default EDashboard;