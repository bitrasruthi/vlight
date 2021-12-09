import React from "react";
import Table from "../Common/table";
import { Link, Redirect } from "react-router-dom";
import Popup from "./popUp";
// import { Spinner } from '../spinner';
import { Col, Button } from 'reactstrap';

class LeaveTable extends React.Component {
  state = {showPopup: false}
   
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  columns = [
    {
      path: "EmployeeId",
      label: "Employee Id",
      content: (emp) => (
        
        <Link to={`/leaveapproval/${emp._id}`}>{emp.EmployeeId}</Link>     
      ),
    },
    { path: "EmployeeName", label: "Name" },

    { path: "from_Date", label: "From Date" },
    { path: "to_Date", label: "To Date" },
    { path: "subject", label: "Subject" },
    { path: "reason", label: "Reason" },
    { path: "leave_type", label: "Type of Leave" },
    { path: "status", label: "Status" },
  ];


  componentDidMount() {
    console.log(this.state);
  }
  
  render() {
    const { leaves, onSort, sortColumn, onload, disabled } = this.props;

    return (
      <div>
        
      <Table
        columns={this.columns}
        data={leaves}
        sortColumn={sortColumn}
        onSort={onSort}
        onload={onload}
        disabled={disabled}
        // LoadingComponent={Spinner}
      />
      </div>
    );
  }
}

export default LeaveTable;
