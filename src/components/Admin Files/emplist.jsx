import React from "react";

import _ from "lodash";
import { connect } from "react-redux";
import get_employeelist, { get_moreemployeelist } from "../../reduxstore/actions/employeeAction";
import EmployeeTable from "./emplisttable";
import Sidebar from "../Sidebar/Sidebar";

import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { Col } from "reactstrap";



class Employees extends React.Component {
  state = {
    employees: [],
    searchQuery: "",
    sortColumn: {},
    isLoading: true,
    loadstatus: false,
    limit: 2,
    skip: 0,
    i: 0,
  };

  constructor(props) {
    super(props);
    this.state.isLoading = true;
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    try {
      if (!this.props.getemployeelist) {
        await get_employeelist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })
      }

      // const {data:movies} = await getMovies();
      const dd = await this.props.getemployeelist;
      console.log(dd)
      await this.setState({ employees: dd.data, i: dd.skip || 1 });
      await this.setState({ isLoading: false });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ isLoading: false });
        toast("no data")
      }
    }
  }


  handleSort = (sortColumn) => this.setState({ sortColumn });

  onloadmore = async () => {
    const { i } = this.state

    try {
      await this.setState({ loadstatus: true });
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      await get_moreemployeelist(skip)
      const dd = await this.props.getemployeelist.data;
      await this.setState({ employees: dd })
      await this.setState({ loadstatus: false });

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // toast.error(ex.response.data.data);
        await this.setState({ loadstatus: false });
      }
      if (ex.response && ex.response.status === 400) {
        this.setState({ loadstatus: true, i: this.state.i - 1 })
        await this.setState({ isLoading: false });

      }
    }
  };



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

        <Col lg="8" md="7" style={{ width:'920px', marginLeft: "rem", paddingTop: "px", position: 'absolute' }}>

        <EmployeeTable
          employees={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onload={this.onloadmore}
          disabled={this.state.loadstatus}
        // onDelete={this.handleDelete}
        />
        </Col>
        {/* </Col> */}
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
