import React from "react";
import Table from "../Common/table";

import ESidebar from './../Sidebar/eSidebar';

class ELeavsTable extends React.Component {
  columns = [
    { path: "from_Date", label: "From Date" },
    { path: "to_Date", label: "To Date" },
    { path: "subject", label: "Subject" },
    { path: "reason", label: "Reason" },
    { path: "leave_type", label: "Leave Type" },
    { path: "status", label: "Status" },
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
    const { leaves, sortColumn, onSort } = this.props;
    return (
      <div>
        <ESidebar />
        <Table
          columns={this.columns}
          data={leaves}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default ELeavsTable;
