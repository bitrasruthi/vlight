import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import ReactLoading from "react-loading";

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
    const { columns, sortColumn, onSort, data } = this.props;
    return (
      <div >
        {/* <div
          class="col-md-2 col-md-offset-2 centered"
          style={{ textAlign: "center", paddingLeft: "250px",  }}
        > */}
        {/* <div  className="row justify-content-center"> */}
        <div style={{ textAlign: 'center', marginLeft: '130px' }} className="col-auto">
          <table style={{ marginTop: '50px', }} className=" table table-responsive">
            <TableHeader
              columns={columns}
              sortColumn={sortColumn}
              onSort={onSort}
            />

            <TableBody columns={columns} data={data} />
          </table>

        </div>
      </div>
      // </div>
    );
  }
}

export default Table;
