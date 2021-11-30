import React from "react";
import EmpTable from "./attTable";
import Pagination from "../Common/pagination";
import paginate  from "../Common/paginate";
import _ from "lodash";
import get_attlist from "../../reduxstore/actions/attAction";
import emp from "../../services/empservice";
import { connect } from "react-redux";
import Paginations from './../Common/pagination';

class AttList extends React.Component {
  state = {
    employess: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "Date", order: "asc" },
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      employess: allemployess,

      sortColumn,
    } = this.state;

    let filtered = allemployess;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const employess = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: employess };
  };

  async componentDidMount() {
    if (!this.props.getattlist) {
      await get_attlist();
    }

    const dd = await this.props.getattlist;
    await this.setState({ employess: dd });

    // const jwt = await emp.getCurrentUser();
    // const id = jwt.EmployeeId;
    // const dd = await emp.getAttendance(id);
    // this.setState({
    //   employess: dd.data,
    // });
  }

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: employess } = this.getPageData();
    return (
      <div>
        <EmpTable
          employess={employess}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Paginations
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getattlist: state.getattlist,
  };
};

export default connect(mapStateToProps)(AttList);
