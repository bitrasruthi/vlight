import React from "react";

import _ from "lodash";
import { connect } from "react-redux";
import get_employeelist from "../../reduxstore/actions/employeeAction";
import EmployeeTable from "./emplisttable";
import Sidebar from "../Sidebar/Sidebar";

import { toast } from "react-toastify";
import ReactLoading from "react-loading";



class Employees extends React.Component {
  state = {
    employees: [],
    searchQuery: "",
    sortColumn: { path: "EmployeeName", order: "asc" },
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.state.isLoading = true;
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    if (!this.props.getemployeelist) {
      await get_employeelist();
    }
    // const {data:movies} = await getMovies();
    const dd = await this.props.getemployeelist;
    // console.log(dd);
    await this.setState({ employees: dd });
    await this.setState({ isLoading: false });


  }

  handleSort = (sortColumn) => this.setState({ sortColumn });




  render() {
    const {

      sortColumn,
      employees: data
    } = this.state;

    // if(count === 0)return <p>No movies available in the selected list</p>;


    return (
      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className=" py-2 py-sm-3 ">
        <Sidebar />
        <EmployeeTable
          employees={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        // onDelete={this.handleDelete}
        />
        {this.state.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <ReactLoading
              type="bars"
              color="#aaaa"
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          ""
        )}
        {/* <Paginations
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getemployeelist: state.getemployeelist,
  };
};

export default connect(mapStateToProps)(Employees);
