import Table from "../Common/table";
import React from "react";

class HoliTable extends React.Component {
  columns = [
    { path: "SERIAL_NO", label: "S.NO" },
    { path: "date", label: "Date" },
    { path: "festival", label: "Festival" },
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
    const { holidays, sortColumn, onSort, disabled, loading } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={holidays}
          sortColumn={sortColumn}
          onSort={onSort}
          disabled={disabled}
          loading={loading}
        />
      </div>
    );
  }
}

export default HoliTable;
