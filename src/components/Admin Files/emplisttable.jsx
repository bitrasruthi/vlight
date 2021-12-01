import React from "react";
import Table from "../Common/table";
import { Link } from "react-router-dom";
// import { Spinner } from '../spinner';

class EmployeeTable extends React.Component {
  columns = [
    {
      path: "EmployeeId",
      label: "Employee Id",

      content: (emp) => (
        <Link to={`/empattlist/${emp.EmployeeId}`}> {emp.EmployeeId}</Link>
      ),
    },
    { path: "EmployeeName", label: "Name" },
    { path: "Email", label: "Email" },
    { path: "Phone", label: "Phone" },
    { path: "DateOfBirth", label: "DateOfBirth" },
    { path: "Role", label: "Role" },
    { path: "NetSalary", label: "NetSalary" },
  ];

  render() {
    const { employees, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={employees}
        sortColumn={sortColumn}
        onSort={onSort}
        // LoadingComponent={Spinner}
      />
    );
  }
}

export default EmployeeTable;
