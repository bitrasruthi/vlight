import React from "react";
import Table from "../Common/table";
import { Link } from "react-router-dom";
// import { Spinner } from '../spinner';

class TerminateEmpTable extends React.Component {
  columns = [
    { path: "EmployeeId", label: "Employee Id" },
    { path: "EmployeeName", label: "Employee Name" },
    { path: "Reason", label: "Reason" },
    { path: "AgreementDone", label: "Agreement" },
  ];

  render() {
    const { employees, onSort, sortColumn, onload, disabled, loading } = this.props;
    return (
      <Table
        columns={this.columns}
        data={employees}
        sortColumn={sortColumn}
        onSort={onSort}
        onload={onload}
        disabled={disabled}
        loading={loading}
      // LoadingComponent={Spinner}
      />
    );
  }
}

export default TerminateEmpTable;
