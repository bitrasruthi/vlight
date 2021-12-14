import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import { register } from "../../services/userService";
import get_employeelist from 'reduxstore/actions/employeeAction';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
} from "reactstrap";




class AddNew extends Forms {
  state = {
    data: {
      EmployeeName: "",
      EmployeeId: "",
      Phone: "",
      Email: "",
      Role: "",
      DateOfBirth: "",
      NetSalary: "",
      AgreementYears: "",
    },
    errors: [],
    roles: [],
  };

  schema = {
    EmployeeName: Joi.string().min(5).required(),
    EmployeeId: Joi.string().required(),
    Phone: Joi.number().required(),
    Email: Joi.string().email().required(),
    Role: Joi.string().required(),
    DateOfBirth: Joi.string().required(),
    NetSalary: Joi.number().required(),
    AgreementYears: Joi.number().required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      console.log(data)
      const pp = await register(data);
      console.log(pp);
      toast.success("Employee Added");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/dashboard";
      }, 2000);
      const { state } = this.props.location;
      await get_employeelist();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.AgreementYears = ex.response.data.data;
        this.setState({ errors });
      }
    }

    // this.props.history.push("/admin/addemployee");
  };

  render() {
    return <div>
      <Sidebar />
      {/* <NavBar/> */}
      <Col lg="6" md="7" style={{ marginLeft: "25%", paddingTop: "auto", position: 'absolute' }}>
        <Card className="bg-secondary shadow border-0" >
          <CardHeader className="bg-gradient-success border-0">
            <Col style={{ marginLeft: '200px', paddingBottom: '10px' }} xs="8">
              <h3 className="mb--3">Add New Employee</h3>
            </Col>

          </CardHeader>
          <CardBody className="px-lg-3 py-sm-5">
            <Form role="form" onSubmit={this.handleSubmit}>

              {this.renderInput("EmployeeId", "Employee ID")}
              {this.renderInput("EmployeeName", "Employee Name")}
              {this.renderInput("Phone", "Phone")}
              {this.renderInput("Email", "Email ID")}
              {this.renderInput("Role", "Designation")}
              {this.renderInput("DateOfBirth", "Date Of Birth", "date")}
              {this.renderInput("NetSalary", "Net Salary")}
              {this.renderInput("AgreementYears", "Agreement Years", 'number')}

              <div className="text-center">
                <Button style={{ background: '#2DCECB', color: 'black', border: 'none' }} className="my-4" color="primary" type="submit">
                  Add
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>;
  }
}

export default AddNew;