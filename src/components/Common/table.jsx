import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableFooter from "./tableFooter";
import { Col } from 'reactstrap';


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
    const { columns, sortColumn, onSort, data, onload, disabled, loading } = this.props;
    return (

      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className=" py-4 py-sm-3 ">
        <table style={{ marginTop: 'px', marginLeft: '20rem', textAlign: 'center' }} className="table table-bordered table-responsive">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />

          <TableBody columns={columns} data={data} onload={onload} disabled={disabled} />
          <div style={{ width: '100%' }}>
            <TableFooter onload={onload} disabled={disabled} loading={loading} />
          </div>
        </table>

      </div>
      // </div>
    );
  }
}

export default Table;
