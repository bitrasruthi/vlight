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
    {
      key: "status",
      label: 'Status',
      content: (emp) => (
        <span className={`badge badge-${emp.status === 'pending' ? 'dark' : `${emp.status === 'Rejected' ? 'danger' : 'success'}`}`}>
          {emp.status}
        </span>
      ),
    },
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
    const { leaves, sortColumn, onSort, onload, disabled, loading } = this.props;
    return (
      <div>
        <ESidebar />
        
        <Table
          columns={this.columns}
          data={leaves}
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

export default ELeavsTable;
