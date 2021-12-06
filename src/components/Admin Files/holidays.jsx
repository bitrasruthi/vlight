import Sidebar from "components/Sidebar/Sidebar";
import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import paginate from "../Common/paginate";
import _ from "lodash";
import HoliTable from "./holidaysTable";
import Paginations from "./../Common/pagination";
import { connect } from "react-redux";
import get_hoildays from "../../reduxstore/actions/hoildaysActions";
import { postholidays } from '../../services/settings'
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

class Holidays extends Forms {
  state = {
    data: { date: '', festival: '' },
    isLoading: true,
    holidays: [],
    pageSize: 10,
    errors: [],
    currentPage: 1,
    sortColumn: { path: "Date", order: "asc" },
  };
  schema = {
    date: Joi.string().required(),
    festival: Joi.string().required(),
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
  constructor() {
    super();
    this.state.isLoading = true;
  }

  async componentDidMount() {
    if (!this.props.gethoildayslist) {
      await get_hoildays();
    }

    const dd = await this.props.gethoildayslist[0].holidays;

    await this.setState({ holidays: dd });
    this.setState({ isLoading: false });

  }

  doSubmit = async () => {
    const { data } = this.state
    try {
      await postholidays(data)
      var holidays = { ...this.state.holidays, data }
      await this.setState({ holidays })
      await this.setState({ data: { date: '', festival: '' } });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.festival = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { pageSize, currentPage, sortColumn, data } = this.state;
    const { totalCount, data: holidays } = this.getPageData();
    return (
      <div>
         <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className=" py-2 py-sm-3 ">
        <Sidebar />
        <Col lg="8" md="7" style={{ marginLeft: "6rem", paddingTop: "px", position: 'absolute', }}>

        
          <HoliTable
            holidays={holidays}
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
        {/* <Paginations
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        /> */}
        <Col lg="3" md="3" style={{ marginLeft: "66%", marginTop: "auto", position: "fixed", }}>
          <Card className="bg-secondary shadow border-0" >
            <CardBody className="px-lg-3 py-sm-5">
              <Form role="form" onSubmit={this.handleSubmit}>

                {this.renderInput("date", "Date", 'date')}
                {this.renderInput("festival", "Festival")}


                <div className="text-center">
                  {this.renderButton("Add Hoilday")}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        </div>
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


