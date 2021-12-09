import React from "react";
import EmpTable from "../Employee Files/attTable";
import Pagination from "../Common/pagination";
import paginate from "../Common/paginate";
import _ from "lodash";
import get_empattlist, { get_moreempattlist } from "../../reduxstore/actions/adminattAction";
import emp from "../../services/empservice";
import { connect } from "react-redux";
import Paginations from "./../Common/pagination";
import Joi from "joi-browser";
import Sidebar from "components/Sidebar/Sidebar";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";


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


class EmpAttList extends Forms {
  state = {
    data: { to_Date: "", from_Date: "" },
    employess: [],
    pageSize: 10,
    limit: 2,
    skip: 0,
    i: 0,
    loadstatus: false,
    id: [],
    isLoading: true,
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
      const { data, employess, id } = this.state;
      var ss = { ...data, EmployeeId: id };
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







  async componentDidMount() {
    await this.setState({ id: this.props.match.params.id })
    if (!this.props.getattlist) {
      await get_empattlist(this.state.id, this.state.skip);
      await this.setState({ i: this.state.i + 1 })

    }

    const dd = await this.props.getademplist;
    await this.setState({ employess: dd });
    await this.setState({ isLoading: false });
  }

  onloadmore = async () => {
    const { i } = this.state

    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      await get_moreempattlist(this.state.id, skip)
      const dd = await this.props.getademplist;
      this.setState({ employess: dd })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
      if (ex.response && ex.response.status === 400) {
        this.setState({ loadstatus: true, i: this.state.i - 1 })
      }
    }
  };

  constructor() {
    super();
    this.state.isLoading = true;
  }

  render() {
    const { sortColumn, employess } = this.state;

    return (
      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className="py-2 py-sm-3 ">
        <Sidebar />
        <Col lg="8" md="7" style={{ marginLeft: "6rem", paddingTop: "px", position: 'absolute', }}>

          <EmpTable
            employess={employess}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          {/* <Button variant="contained" disabled={this.state.loadstatus} onClick={this.onloadmore} style={{
            zIndex: '1001'
          }}>
            Load more
          </Button> */}
        </Col>
        <Col>
          {this.state.employess.length ? '' : <p> No Data</p>}

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
    getademplist: state.getademplist,
  };
};

export default connect(mapStateToProps)(EmpAttList);
