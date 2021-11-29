import Footer from 'components/Footers/AdminFooter';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';

class Dashboard extends React.Component {
    render() { 
        return <div>
            <Sidebar/>
            <NavBar/>
            <h1 style={{textAlign: 'center'}}>Welcome Admin!!!</h1>
        </div>;
    }
}
 
export default Dashboard;