import Sidebar from "components/Sidebar/Sidebar";
import React from "react";
import Joi from "joi-browser";
import Forms from 'components/Common/form';
import _ from "lodash";
import HoliTable from "./holidaysTable";
import { connect } from "react-redux";
import get_hoildays from "../../reduxstore/actions/hoildaysActions";
import { postholidays } from '../../services/settings'
import ReactLoading from "react-loading";

import {
Button,
  Card,
  CardBody,
  Form,
  Col,
} from "reactstrap";

class Holidays extends Forms {
  state = {
    data: { date: '', festival: '' },
    isLoading: true,
    holidays: [],
    errors: [],
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
    await this.setState({ isLoading: false });

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
    const { sortColumn, holidays } = this.state;
    return (
      <div>
        <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
          className=" py-2 py-sm-3 ">
          <Sidebar />
          <Col lg="8" md="7" style={{ marginLeft: "12rem", paddingTop: "px", position: 'absolute', }}>


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

          <Col lg="3" md="3" style={{ marginLeft: "75%", marginTop: "auto", position: "fixed", }}>
          <Card className="card__wrap--inner bg-secondary shadow border-0">
              <CardBody className="px-lg-3 py-sm-5">
                <Form role="form" onSubmit={this.handleSubmit}>

                  {this.renderInput("date", "Date", 'date')}
                  {this.renderInput("festival", "Festival")}


                  <div className="text-center">
                    {/* {this.renderButton("Add Hoilday")} */}
                    <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', color: 'white',border: 'none' }} variant="contained" onClick={this.onApprove}>
                Add Holiday
              </Button>
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


