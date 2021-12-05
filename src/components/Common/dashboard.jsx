import NoOfEmp from 'components/Admin Files/noofemp';
import Footer from 'components/Footers/AdminFooter';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import ProductionHours from './productionHours';
import ECCard from 'components/Admin Files/empCount';

class Dashboard extends React.Component {
    render() {
        return <div>
            <Sidebar />
            <NavBar />
            <h1 style={{ textAlign: 'center', color: 'black' }}>Welcome Admin!!!</h1>
            <ProductionHours />
            <ECCard />
            {/* <NoOfEmp/> */}
        </div>;
    }
}

export default Dashboard;