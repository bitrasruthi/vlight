import React from "react";
import EmpTable from "../Employee Files/attTable";
import get_empattlist, { get_moreempattlist } from "../../reduxstore/actions/adminattAction";
import emp from "../../services/empservice";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Sidebar from "components/Sidebar/Sidebar";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";


import Forms from "components/Common/form";

import {
  Button,
  Card,
  CardBody,
  Form,

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
    loading: false,
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
      const { data, id } = this.state;
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
    await this.setState({ loadstatus: true, isLoading: true, })
    try {
      await this.setState({ id: this.props.match.params.id })
      if (!this.props.getattlist) {
        await get_empattlist(this.state.id, this.state.skip);
        await this.setState({ i: this.state.i + 1 })

      }

      const dd = await this.props.getademplist;
      await this.setState({ employess: dd });
      await this.setState({ isLoading: false, loadstatus: false });

    }
    catch (er) {
      this.setState({ isLoading: false });
      toast("no data")
    }
  }

  onloadmore = async () => {
    const { i } = this.state
    await this.setState({ loadstatus: true, loading: false })

    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      await get_moreempattlist(this.state.id, skip)
      const dd = await this.props.getademplist;
      this.setState({ employess: dd })
      await this.setState({ loadstatus: false, loading: true })

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
        await this.setState({ loadstatus: false, loading: true })

      }
      if (ex.response && ex.response.status === 400) {
        await this.setState({ loadstatus: true, i: this.state.i - 1 })
        await this.setState({ loading: true })

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
        <h1 style={{ textAlign: 'center', marginLeft: '-150px', color: '#F3A4B4' }}>Employee Attendance</h1>

        <Col lg="8" md="7" style={{ width: '624px', marginLeft: "rem", paddingTop: "px", position: 'absolute', }}>

          <EmpTable
            employess={employess}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onload={this.onloadmore}
            disabled={this.state.loadstatus}
            loading={this.state.loading}
          />
          {/* <Button variant="contained" disabled={this.state.loadstatus} onClick={this.onloadmore} style={{
            zIndex: '1001'
          }}>
            Load more
          </Button> */}
        </Col>
        <Col>
          {this.state.employess.length ? '' : <p> No Data</p>}


        </Col>
        <Col lg="3" md="3" style={{ marginLeft: "75%", marginTop: "auto", position: "fixed", }}>
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
                    {/* {this.renderButton("Search")}{" "} */}
                    <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none' }} variant="contained" onClick={this.onApprove}>
                      Search
                    </Button>
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
