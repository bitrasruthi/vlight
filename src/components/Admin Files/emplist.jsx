import Dashboard from 'components/Common/dashboard';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './../Common/navbar';

class EmpList extends React.Component {
    render() { 
        return <div>
            <Sidebar/>
            <NavBar/>
            <h1 style={{textAlign: 'center'}}>Employee List</h1>
        </div>;
    }
}
 
export default EmpList;