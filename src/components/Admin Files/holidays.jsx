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
import { toast } from 'react-toastify'

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
    loadmore: true,
    loading: true,
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
    try {
      if (!this.props.gethoildayslist) {
        await get_hoildays();
      }
      var dd = await this.props.gethoildayslist[0].holidays;
      // const ff = dd[0].holidays;
      var gg = dd.map(function (currentValue, Index) {
        currentValue.SERIAL_NO = Index + 1
        return currentValue
      })

      console.log(gg);
      await this.setState({ holidays: dd });

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {

      }
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  }

  doSubmit = async () => {
    const { data, holidays } = this.state
    try {
      await postholidays(data)
      var ff = { ...this.state.holidays, data }
      holidays.push(ff.data)
      await this.setState({ holidays, data: { date: '', festival: '' } })

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
          <h1 style={{ textAlign: 'center', marginLeft: '-190px', color: '#F3A4B4' }}>Holiday List</h1>

          <Col lg="3" md="7" style={{ width: '311px', marginLeft: "10rem", paddingTop: "px", position: 'absolute', }}>


            <HoliTable
              holidays={holidays}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              disabled={this.state.loadmore}
              loading={this.state.loading}
            />

          </Col>

          <Col lg="3" md="3" style={{ marginLeft: "75%", marginTop: "auto", position: "fixed", }}>
            <Card className="card__wrap--inner bg-secondary shadow border-0">
              <CardBody className="px-lg-3 py-sm-5">
                <Form role="form" onSubmit={this.handleSubmit}>

                  {this.renderInput("date", "Date", 'date')}
                  {this.renderInput("festival", "Festival")}


                  <div className="text-center">
                    {/* {this.renderButton("Add Hoilday")} */}
                    <Button className="bg-gradient-pink" style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', color: 'white', border: 'none' }} variant="contained" onClick={this.onApprove}>
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


