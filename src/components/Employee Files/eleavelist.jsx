import React from "react";
import paginate from "../Common/paginate";
import Pagination from "../Common/pagination";
import _ from "lodash";
import { connect } from "react-redux";
import get_empleavelist from "../../reduxstore/actions/empleaveTable";

import ELeavsTable from "./eleavetable";
import Paginations from "./../Common/pagination";
import ReactLoading from "react-loading";
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
      await get_empleavelist();
    }
    const dd = await this.props.getempleavelist;
    await this.setState({ leaves: dd });
    this.setState({ isLoading: false });

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
        {this.state.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              height: "100vh",
            }}
          >
            <Button variant="contained" onClick={this.onloadmore} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}>
              Approve
            </Button>
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
