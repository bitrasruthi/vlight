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
  Button,

} from "reactstrap";
class LeaveList extends React.Component {
  state = {
    leaves: [],
    skip: 0,
    i: 0,
    loadstatus: false,
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "Leave", order: "asc" },
    isLoading: true,
  };

  constructor(props) {
    super(props);

    this.state.isLoading = true;

  }

  async componentDidMount() {
    if (!this.props.getleavelist) {
      await get_leavelist(this.state.skip);
      await this.setState({ i: this.state.i + 1 })
    }
    // const {data:movies} = await getMovies();
    const dd = await this.props.getleavelist;
    console.log(dd)
    await this.setState({ leaves: dd, i: dd.skip || 1 })
    console.log(this.state)
    this.setState({ isLoading: false });

  }

  onloadmore = async () => {
    const { i } = this.state

    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      await get_moreleavelist(skip)
      const dd = await this.props.getleavelist;
      this.setState({ leaves: dd })
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
      <div className="row">
        <Sidebar />
        <LeaveTable
          leaves={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Button variant="contained" disabled={this.state.loadstatus} onClick={this.onloadmore} style={{
          zIndex: '1001'
        }}>
          Load more
        </Button>
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
              color="#aaaa"
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          ""
        )}

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
