import React from "react";
import paginate from "../Common/paginate";
import _ from "lodash";
import { connect } from "react-redux";
import LeaveTable from "./leavetable";
import Sidebar from "../Sidebar/Sidebar";
import get_leavelist from "../../reduxstore/actions/leaveAction";
import Paginations from "./../Common/pagination";
import ReactLoading from "react-loading";

class LeaveList extends React.Component {
  state = {
    leaves: [],

    currentPage: 1,
    pageSize: 4,
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
      await get_leavelist();
    }
    // const {data:movies} = await getMovies();
    const dd = await this.props.getleavelist;
    // console.log(dd);
    await this.setState({ leaves: dd });
    this.setState({ isLoading: false });

  }

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
