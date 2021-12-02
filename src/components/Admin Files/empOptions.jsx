import React from 'react';
import { Button } from 'reactstrap';


class EmpOptions extends React.Component {
    columns = [
        {path: "EmployeeId", label: "Employee Id",},
        { path: "EmployeeName", label: "Name" },
    ];

    render() { 
        return <div>
             <Button
                  onClick={this.doOut}
                  className=" my-4 text-danger"
                  color="primary"
                  type="button"
                >
                  Delete
                </Button>
        </div>;
    }
}
 
export default EmpOptions;