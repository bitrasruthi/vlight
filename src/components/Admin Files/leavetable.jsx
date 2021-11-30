import React from "react";
import Table from "../Common/table";
import { Link, Redirect } from "react-router-dom";
// import { Spinner } from '../spinner';

class LeaveTable extends React.Component {
  columns = [
     {
      path: "EmployeeId",
      label: "Employee Id",
      content: (emp) => (
        <Link to={`/leaveapproval/${emp._id}`}>{emp.EmployeeId}</Link>
      ),
    },
      { path: "EmployeeName", label: "Name" },
    { path: "To",label: "To" },
    { path: "from_Date", label: "From Date" },
    { path: "to_Date", label: "To Date" },
    { path: "subject", label: "Subject" },
    { path: "reason", label: "Reason" },
    { path: "leave_type", label: "Type of Leave" },
  ];

  render() {
    const { leaves, onSort, sortColumn } = this.props;

    return (
      <Table
      columns={this.columns}
      data={leaves}
      sortColumn={sortColumn}
      onSort={onSort}
        // LoadingComponent={Spinner}
      />
    );
  }
}

export default LeaveTable;
