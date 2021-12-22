import Table from "../Common/table";
import React from "react";

class EmpTable extends React.Component {
  columns = [
    { path: "EmployeeId", label: "Employee Id" },
    { path: "EmployeeName", label: "Employee Name" },
    { path: "Date", label: "Date" },
    { path: "inTime", label: "InTime" },
    { path: "outTime", label: "outTime" },
  ];

  state = {
    isLoading: null,
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  render() {
    const { employess, sortColumn, onSort, onload, disabled, loading } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={employess}
          sortColumn={sortColumn}
          onSort={onSort}
          onload={onload}
          disabled={disabled}
          loading={loading}
        />
      </div>
    );
  }
}

export default EmpTable;
