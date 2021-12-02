import Sidebar from "components/Sidebar/Sidebar";
import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import paginate from "../Common/paginate";
import _ from "lodash";
import HoliTable from "./holidaysTable";
import Paginations from "./../Common/pagination";
import { connect } from "react-redux";
import get_hoildays from "../../reduxstore/actions/hoildaysActions";


class Holidays extends React.Component {
  state = {
    holidays: [],
    pageSize: 10,
    errors: [],
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
      holidays: allholidays,

      sortColumn,
    } = this.state;

    let filtered = allholidays;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const holidays = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: holidays };
  };

   async componentDidMount() { 
    if (!this.props.gethoildayslist) {
      await get_hoildays();
    }

    const dd = await this.props.gethoildayslist[0].holidays;
    console.log(dd)
    await this.setState({ holidays: dd });
  }

  doSubmit = async () => {
    try {
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // const errors = { ...this.state.errors };
        // errors.to_Date = ex.response.data.data;
        // this.setState({ errors });
      }
    }
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: holidays } = this.getPageData();
    return (
      <div>
        <Sidebar />
        <div style={{ textAlign: "center" }}>Holiday List</div>
        <HoliTable
          holidays={holidays}
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
    gethoildayslist: state.gethoildayslist,
  };
};

export default connect(mapStateToProps)(Holidays);


