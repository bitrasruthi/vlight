import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';


class Holidays extends React.Component {
    render() { 
        return (
            <div>
            <Sidebar/>
        <div style={{textAlign: 'center'}}>Holiday List</div>
        </div>
        );
    }
}
 
export default Holidays;