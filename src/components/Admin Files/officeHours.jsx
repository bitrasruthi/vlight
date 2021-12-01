import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';

class OfficeHours extends React.Component {
    state = {inTime: '10:15', outTime: '7:30'}
    render() { 
        return <div>
            <Sidebar/>
            <h1 style={{textAlign:'center'}}>In Time: {this.state.inTime} </h1>
            <h1 style={{textAlign:'center'}}>Out Time: {this.state.outTime} </h1>
        </div>;
    }
}
 
export default OfficeHours;