import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import get_empleavelist, { get_moreempleavelist } from "../../reduxstore/actions/empleaveTable";

import ELeavsTable from "./eleavetable";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

import {
  Col,
} from "reactstrap";


class ELeavsList extends React.Component {
  state = {
    leaves: [],
    limit: 2,
    loadstatus: false,
    skip: 0,
    i: 0,
    isLoading: true,
    loading: false,
    sortColumn: { path: "Date", order: "asc" },
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  constructor() {
    super();
    this.state.isLoading = true;
  }


  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };




  async componentDidMount() {
    await this.setState({ loadstatus: true, isLoading: true, })
    try {
      if (!this.props.getempleavelist) {
        await get_empleavelist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })

      }


      const dd = await this.props.getempleavelist;
      await this.setState({ leaves: dd.data, i: dd.skip || 1 });
      await this.setState({ isLoading: false, loadstatus: false });

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ isLoading: false });
        toast("no data")
      }
    }

  }
  onloadmore = async () => {
    const { i } = this.state
    await this.setState({ loadstatus: true, loading: false })
    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })
      await get_moreempleavelist(skip)
      const dd = await this.props.getempleavelist;

      await this.setState({ leaves: dd })
      await this.setState({ loadstatus: false, loading: true })

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
        await this.setState({ loadstatus: true })
      }
      if (ex.response && ex.response.status === 400) {
        await this.setState({ loadstatus: true, i: this.state.i - 1 })
        await this.setState({ loadstatus: true, loading: true })
      }
    }
  };

  render() {
    const { sortColumn, leaves } = this.state;
    return (
      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className=" py-2 py-sm-3 ">
        <Col lg="8" md="7" style={{ width: '668px', marginLeft: "8rem", paddingTop: "px", position: 'absolute' }}>
          <ELeavsTable
            leaves={leaves}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onload={this.onloadmore}
            disabled={this.state.loadstatus}
            loading={this.state.loading}
          />

        </Col>
       

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
