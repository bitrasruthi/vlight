import React from "react";
import EmpTable from "./attTable";
import Pagination from "../Common/pagination";
import paginate from "../Common/paginate";
import _ from "lodash";
import get_attlist, { get_moreattlist } from "../../reduxstore/actions/attAction";
import emp from "../../services/empservice";
import { connect } from "react-redux";
import Paginations from "./../Common/pagination";
import Joi from "joi-browser";
import ESidebar from "../Sidebar/eSidebar";
import { toast } from "react-toastify";

import Forms from "components/Common/form";
import ReactLoading from "react-loading";


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
    skip: 0,
    i: 0,
    isLoading: true,
    pageSize: 10,
    errors: [],
    currentPage: 1,
    sortColumn: { path: "", order: "" },
  };
  constructor() {
    super();
    this.state.isLoading = true;
  }

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
      const jwt = await emp.getCurrentUser()

      var ss = { ...data, EmployeeId: jwt.EmployeeId };
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
      await get_attlist(this.state.skip);
      await this.setState({ i: this.state.i + 1 })
    }

    const dd = await this.props.getattlist;
    await this.setState({ employess: dd });
    await this.setState({ isLoading: false });

    // const jwt = await emp.getCurrentUser();
    // const id = jwt.EmployeeId;
    // const dd = await emp.getAttendance(id);
    // this.setState({
    //   employess: dd.data,
    // });
  }

  onloadmore = async () => {
    const { i } = this.state

    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      await get_moreattlist(skip)
      const dd = await this.props.getattlist;
      this.setState({ employess: dd })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: employess } = this.getPageData();
    return (
      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className=" py-2 py-sm-3 ">
        <ESidebar />
        <Col lg="8" md="7" style={{ marginLeft: "6rem", paddingTop: "px", position: 'absolute', }}>

          <EmpTable
            employess={employess}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
        </Col>
      <Col>
        <Button variant="contained" onClick={this.onloadmore} style={{
          zIndex: '1001', marginLeft: '270px'
        }}>
          Load more
        </Button>
        {this.state.employess.length ? <p> No Data</p> : ''}
        {this.state.isLoading ? (
          <div
            style={{
              zIndex: '1001'
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
</Col>
        <Col lg="3" md="3" style={{ marginLeft: "76%", marginTop: "auto", position: "fixed", }}>
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
