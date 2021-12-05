import React from "react";
import paginate from "../Common/paginate";
import Pagination from "../Common/pagination";
import _ from "lodash";
import { connect } from "react-redux";
import get_empleavelist, { get_moreempleavelist } from "../../reduxstore/actions/empleaveTable";

import ELeavsTable from "./eleavetable";
import Paginations from "./../Common/pagination";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";


class ELeavsList extends React.Component {
  state = {
    leaves: [],
    skip: 0,
    i: 0,
    pageSize: 10,
    currentPage: 1,
    isLoading: true,
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
      await get_empleavelist(this.state.skip);
      await this.setState({ i: this.state.i + 1 })

    }
    const dd = await this.props.getempleavelist;
    await this.setState({ leaves: dd });
    console.log(this.state)
    this.setState({ isLoading: false });

  }
  onloadmore = async () => {
    const { i } = this.state
    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })
      await get_moreempleavelist(skip)
      const dd = await this.props.getempleavelist;

      this.setState({ leaves: dd })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: leaves } = this.getPageData();
    return (
      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className="header bg-gradient-success py-2 py-sm-3 ">
        <Col lg="8" md="7" style={{ marginLeft: "6rem", paddingTop: "px", position: 'absolute' }}>
          <ELeavsTable
            leaves={leaves}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Button variant="contained" onClick={this.onloadmore} style={{
            zIndex: '1001'
          }}>
            Load more
          </Button>
        </Col>
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
    getempleavelist: state.getempleavelist,
  };
};

export default connect(mapStateToProps)(ELeavsList);
