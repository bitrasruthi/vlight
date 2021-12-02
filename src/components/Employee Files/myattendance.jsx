import React from "react";
import EmpTable from "./attTable";
import Pagination from "../Common/pagination";
import paginate from "../Common/paginate";
import _ from "lodash";
import get_attlist from "../../reduxstore/actions/attAction";
import emp from "../../services/empservice";
import { connect } from "react-redux";
import Paginations from "./../Common/pagination";
import Joi from "joi-browser";
import ESidebar from "../Sidebar/eSidebar";

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

class AttList extends Forms {
  state = {
    data: { to_Date: "", from_Date: "" },
    employess: [],
    pageSize: 4,
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
      const { data, employess } = this.state;
      var ss = { ...data, EmployeeId: employess[0].EmployeeId };
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
      <div style={{ paddingBottom: "70%" }}>
        <ESidebar />
        <EmpTable
          employess={employess}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        {/* <Paginations
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        /> */}
        <Col
          lg="3"
          md="3"
          style={{
            marginLeft: "60%",
            marginTop: "-300px",
            position: "fixed",
          }}
        >
          <Card className="card__wrap--inner bg-secondary shadow border-0">
            {/* <h1
              style={{
                marginLeft: "60px",
                paddingTop: "28px",
              }}
            >
              Filter </h1> */}
            <CardBody className="px-lg-2 py-sm-5">
              <Form
                role="form"
                onSubmit={this.handleSubmit}
                style={{
                  padding: "0px 20px",
                  textAlign: "",
                  color: "",
                }}
              >
                {this.renderInput("from_Date", "From Date", "date")}
                {this.renderInput("to_Date", "To Date", "date")}

                <div className="text-center">
                  <div
                  // style={{ background: "#172B4D", border: "none" }}
                  // className="my-4"
                  // color="primary"
                  // type="submit"
                  >
                    {" "}
                    {this.renderButton("Search")}{" "}
                  </div>

                  {/* <Button
                    style={{ background: "#172B4D", border: "none" }}
                    className="my-4"
                    color="primary"
                    type="submit"
                  >
                    search
                  </Button> */}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
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
