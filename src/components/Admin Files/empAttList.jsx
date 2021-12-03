import React from "react";
import EmpTable from "../Employee Files/attTable";
import Pagination from "../Common/pagination";
import paginate from "../Common/paginate";
import _ from "lodash";
import get_empattlist from "../../reduxstore/actions/adminattAction";
import emp from "../../services/empservice";
import { connect } from "react-redux";
import Paginations from "./../Common/pagination";
import Joi from "joi-browser";
import Sidebar from "components/Sidebar/Sidebar";

import Forms from "components/Common/form";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import Filter from "components/filter";

class EmpAttList extends Forms {
  state = {
    data: { to_Date: "", from_Date: "" },
    employess: [],
    pageSize: 10,
    id:[],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "Date", order: "asc" },
  };

  schema = {
    from_Date: Joi.string().required(),
    to_Date: Joi.string().required(),
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  doSubmit = async () => {
    try {
      const { data, employess,id } = this.state;
      var ss = { ...data, EmployeeId:id };
      await this.setState({ data: ss });
      const atts = await emp.getAttendanceserc(this.state.data);
      await this.setState({ employess: atts.data });
      await this.setState({ data: { to_Date: "", from_Date: "" } });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.to_Date = ex.response.data.data;
        this.setState({ errors });
      }
    }
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
     await this.setState({ id :this.props.match.params.id})
    if (!this.props.getattlist) {
      await get_empattlist(this.state.id);
    }

    const dd = await this.props.getademplist;
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
        <Sidebar />
        <Col lg="9" md="9">
          <EmpTable
            employess={employess}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
        </Col>
        {/* <Paginations
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        /> */}
       <Filter/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getademplist: state.getademplist,
  };
};

export default connect(mapStateToProps)(EmpAttList);
