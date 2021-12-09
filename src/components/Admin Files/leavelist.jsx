import React from "react";
import paginate from "../Common/paginate";
import _ from "lodash";
import { connect } from "react-redux";
import LeaveTable from "./leavetable";
import Sidebar from "../Sidebar/Sidebar";
import get_leavelist, { get_moreleavelist } from "../../reduxstore/actions/leaveAction";
import Paginations from "./../Common/pagination";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import {
  Button, Col
  
} from "reactstrap";
import TableBody from './../Common/tableBody';
class LeaveList extends React.Component {
  state = {
    leaves: [],
    limit: 2,
    loadstatus: false,
    i: 0,
    skip: 0,
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "Leave", order: "asc" },
    isLoading: true,
    Button
  };

  constructor(props) {
    super(props);

    this.state.isLoading = true;

  }

  async componentDidMount() {
    try {

      if (!this.props.getleavelist) {
        await get_leavelist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })
      }
      // const {data:movies} = await getMovies();
      const dd = await this.props.getleavelist;
      console.log(dd)
      await this.setState({ leaves: dd, i: dd.skip || 1 })

      this.setState({ isLoading: false });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ isLoading: false });
        toast("no data")
      }
    }
  }

  onloadmore = async() =>{
    const { i, limit } = this.state
    try {
      var skip = i * limit
      await this.setState({ i: this.state.i + 1 })

      await get_moreleavelist(skip)
      const dd = await this.props.getleavelist;
      await this.setState({ leaves: dd })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
      if (ex.response && ex.response.status === 400) {
        this.setState({ loadstatus: true, i: this.state.i - 1 })
      }
    }
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => this.setState({ sortColumn });

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      leaves: allLeaves,
    } = this.state;

    let filtered = allLeaves;
    //   if(searchQuery)
    //       filtered =allLeaves.filter(m=>m.title.toString().toLowerCase().startsWith(searchQuery.toLowerCase()));
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const leaves = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: leaves };
  };

  approveLeave = {
    key: "approve",
    content: (leave) => (
      <button
        onClick={() => this.props.onApprove(leave)}
        className="btn btn-danger btn-sm"
      >
        Approve
      </button>
    ),
  };

  handleApprove = () => {
    this.approveLeave();
  };

  render() {
    const { length: count } = this.state.leaves;
    const { pageSize, currentPage, sortColumn, leaves: allLeaves } = this.state;

    // if(count === 0)return <p>No movies available in the selected list</p>;
    const { totalCount, data } = this.getPagedData();

    return (

      <div style = {{height: '', position: "absolute", left: '0', width: '100%', }} 
      className=" py-2 py-sm-3 "> 
      <Sidebar />
      <Col lg="9" md="7" style={{ marginLeft: "4rem", paddingTop: "px", position: 'absolute', }}>

        <LeaveTable
          leaves={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onload={this.onloadmore}
          disabled={this.state.loadstatus}
          />
          {/* {this.renderLoadButton('More')} */}
        {/* <Button variant="contained" disabled={this.state.loadstatus} onClick={this.onloadmore} style={{
          zIndex: '1001', marginLeft: '180px'
        }}>
        Load more
      </Button> */}
        {this.state.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              height: "100vh",
            }}
          >
            <ReactLoading
              type="bars"
              color="black"
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          ""
        )}
    </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getleavelist: state.getleavelist,
  };
};

export default connect(mapStateToProps)(LeaveList);
