import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";


class Table extends React.Component {
  state = {
    isLoading: true,
  };

  constructor() {
    super();
    this.state.isLoading = true;
  }

  handleloading = () => { };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { columns, sortColumn, onSort, data, onload, disabled } = this.props;
    return (

      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className=" py-2 py-sm-3 ">
        <table style={{ marginTop: 'px', marginLeft: '20rem', textAlign: 'center' }} className=" table table-responsive">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />

          <TableBody columns={columns} data={data} onload={onload} disabled={disabled} />
        </table>

      </div>
      // </div>
    );
  }
}

export default Table;
