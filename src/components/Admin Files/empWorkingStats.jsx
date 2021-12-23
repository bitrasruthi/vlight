import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from 'joi-browser';

import Forms from 'components/Common/form';
import { toast } from "react-toastify";
import { connect } from "react-redux";
import get_hrslist from '../../reduxstore/actions/hrsAction'
import Hrstable from './empwortable';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Form,

  Row,
  Col,
} from "reactstrap";
import { calProdHours } from 'services/prodService';

class EmpWorkingStas extends Forms {
  state = {
    data: {
      EmployeeId: "",
      from_Date: '',
      to_Date: '',
    },
    loadstatus: false,
    loadmore: true,
    employees: [],
    errors: [],
    pHours: '',
    sortColumn: { path: "", order: "" },

  };

  schema = {
    EmployeeId: Joi.string().required(),
    from_Date: Joi.string().required(),
    to_Date: Joi.string().required(),
  };
  async componentDidMount() {
    try {
      if (!this.props.getthrslist) {
        await get_hrslist();
      }
      const tt = await this.props.getthrslist;
      const values = Object.values(tt.finaldata)
      await this.setState({ employees: values });

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.to_Date = ex.response.data.data;
        this.setState({ errors });
        toast('somthing wrong please refresh the page')
      }
    }
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  doSubmit = async () => {
    this.setState({ loadstatus: true })
    try {
      const { data: prod } = this.state;
      const pp = await calProdHours(prod);
      const ss = pp.data.data;
      // toast.info(`${ss}`);
      // return ss;

      await this.setState({ pHours: ss })
      console.log(this.state.pHours);
      setTimeout(() => {
        this.setState({ loadstatus: false })
      }, 2000);
      // const { state } = this.props.location;
      //   await get_employeelist();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.EmployeeName = ex.response.data.data;
        await this.setState({ errors });
        await this.setState({ loadstatus: true })
      }
    }

    // this.props.history.push("/admin/addemployee");
  };

  render() {
    const { sortColumn, employees } = this.state
    return <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
      className=" py-5 py-sm-1 ">
      <Sidebar />
      <h1 style={{textAlign: 'center', marginLeft: '-100px',color: '#F3A4B4'}}>Employee Working Status</h1>

      <Col lg="9" md="7" style={{ width:'658px', marginLeft: "rem", paddingTop: "px", position: 'absolute', }}>

        <Hrstable
          employees={employees}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          disabled={this.state.loadmore}
        />
      </Col>

      <Col lg="3" md="3" style={{ marginLeft: "75%", marginTop: "auto", position: "fixed", }}>
        <Card className="card__wrap--inner bg-secondary shadow border-0">
          <CardBody className="px-lg-3 py-sm-5">
            <Form role="form" onSubmit={this.handleSubmit}>

              {this.renderInput("EmployeeId", "Employee ID")}
              {this.renderInput("from_Date", "From Date", "date")}
              {this.renderInput("to_Date", "To Date", 'date')}

              <div className="text-center">
                <Button disabled={this.state.loadstatus} style={{ background: '#2DCECB', border: 'none' }} className="my-4" color="primary" type="submit">
                  Get Production Hours
                </Button>
              </div>
            </Form>
          </CardBody >


          <CardHeader className="bg-gradient-success border-0">
            <span style={{ marginLeft: '80px' }} className="h2 font-weight-bold mb-0 ">{this.state.pHours}
            </span>
          </CardHeader>

        </Card>
      </Col>

    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    getthrslist: state.getthrslist,
  };
};

export default connect(mapStateToProps)(EmpWorkingStas);
