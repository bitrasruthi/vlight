import Table from "../Common/table";
import React from "react";

class HoliTable extends React.Component {
  columns = [
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
    const { holidays, sortColumn, onSort } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={holidays}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default HoliTable;
