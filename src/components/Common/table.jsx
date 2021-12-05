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
      
        <div style = {{height: '', position: "absolute", left: '0', width: '100%', }} 
      className=" py-2 py-sm-3 ">
                  <table style={{ marginTop: 'px', marginLeft: '330px', textAlign: 'center'}} className=" table table-responsive">
            <TableHeader
              columns={columns}
              sortColumn={sortColumn}
              onSort={onSort}
            />

            <TableBody columns={columns} data={data} />
          </table>

        </div>
      // </div>
    );
  }
}

export default Table;
