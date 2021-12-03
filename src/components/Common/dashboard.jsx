import NoOfEmp from 'components/Admin Files/noofemp';
import Footer from 'components/Footers/AdminFooter';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import ProductionHours from './productionHours';

class Dashboard extends React.Component {
    render() { 
        return <div>
            <Sidebar/>
            <NavBar/>
            <h1 style={{textAlign: 'center', color: 'black'}}>Welcome Admin!!!</h1>
            <ProductionHours/>
            <NoOfEmp/>
        </div>;
    }
}
 
export default Dashboard;