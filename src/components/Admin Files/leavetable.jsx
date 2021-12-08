import React from "react";
import Table from "../Common/table";
import { Link, Redirect } from "react-router-dom";
import Popup from "./popUp";
import {toast} from 'react-toastify'
import ApproveReject from './approvereject';
import  {leavestatus}  from "../../services/leaveService";
import { Button } from 'reactstrap';

class LeaveTable extends React.Component {
  state = {
    leave: {},
    toggle: false,
  };

  

  constructor(props) {
    super(props);

    // this.state.isLoading = true;
    this.state = {showPopup: false}

  }
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
        <div >
          <a onClick={this.togglePopup.bind(this)} href={`/leaveapproval/${emp._id}`}>{emp.EmployeeId}</a>
          {this.state.showPopup ? 
            <ApproveReject
            onApprove
            onReject
            />
            : null
          }
        </div>
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

  

  render() {
    const { leaves, onSort, sortColumn } = this.props;

    return (
      <div>
      <div className='popup' style={{paddingRight: '-900px', 
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left:" 0",
        right: "0",
        bottom: "0",
        margin: "auto",
        zIndex: '1001',
        backgroundColor: "rgba(0,0,0, 0.5)"}}>
          <div style={{background: 'transparent', marginLeft: '800px', paddingRight: '0px',
        position: "absolute",
        textAlign: 'center',
        margin: "auto"}} className='popup_inner'>
        <Button  onClick={this.onApprove}>
          Approve
        </Button>
        <Button  onClick={this.onReject}>
          Reject
        </Button>
        <Button  onClick={this.props.closePopup}>close me</Button>
        </div>
      </div>

      <Table
        columns={this.columns}
        data={leaves}
        sortColumn={sortColumn}
        onSort={onSort}
        // LoadingComponent={Spinner}
      />
      </div>
    );
  }
}

export default LeaveTable;
