import React from "react";
import paginate  from "../Common/paginate";
import Pagination from "../Common/pagination";
import _ from "lodash";
import { connect } from "react-redux";
import get_empleavelist from "../../reduxstore/actions/empleaveTable";

import ELeavsTable from "./eleavetable";
import Paginations from './../Common/pagination';

class ELeavsList extends React.Component {
  state = {
    leaves: [],
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
      leaves: allleaves,

      sortColumn,
    } = this.state;

    let filtered = allleaves;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const leaves = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: leaves };
  };

  async componentDidMount() {
    if (!this.props.getempleavelist) {
      await get_empleavelist();
    }
    const dd = await this.props.getempleavelist;
    await this.setState({ leaves: dd });
  }

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: leaves } = this.getPageData();
    return (
      <div>
        <ELeavsTable
          leaves={leaves}
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
    getempleavelist: state.getempleavelist,
  };
};

export default connect(mapStateToProps)(ELeavsList);
