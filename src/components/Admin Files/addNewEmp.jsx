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
  FormGroup,
} from "reactstrap";




class AddNew extends Forms {
  state = {
    data: {
      EmployeeName: "",
      joiningDate: "",
      Phone: "",
      Email: "",
      Role: "",
      DateOfBirth: "",
      NetSalary: "",
      AgreementYears: "",
    },
    loadstatus: false,
    errors: [],
    roles: [],
    maxdate: '',
    mindate: '',
  };



  schema = {

    EmployeeName: Joi.string()
      .min(5)
      .max(50)
      .required().label(
        `"a" should be a type of 'text '`,
      ),
    joiningDate: Joi.date().required(),
    Phone: Joi.string()
      .length(10)
      .regex(/^[6-9]{1}[0-9]{9}$/)
      .required(),
    Email: Joi.string().email().required(),
    Role: Joi.string()
      .min(3)
      .max(50)
      .required(),
    DateOfBirth: Joi.string().required(),
    NetSalary: Joi.number().required(),
    AgreementYears: Joi.number().required(),
  };

  async componentDidMount() {
    let date = new Date();
    let d1 = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());

    var dd = d1.getDate();
    var mm = d1.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = d1.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    var min = yyyy + '-' + mm + '-' + dd;
    await this.setState({ maxdate: min })
    console.log(this.state)
  }

  doSubmit = async () => {

    const { EmployeeName } = this.state.data
    await this.setState({ loadstatus: true })
    try {
      const { data } = this.state;
      var newItem = Object.assign(data, { EmployeeName: data.EmployeeName.toLowerCase(), Role: data.Role.toLowerCase() });
      await register(newItem);
      toast.success("Employee Added");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/dashboard";
      }, 2000);
      const { state } = this.props.location;
      // await get_employeelist();
    } catch (ex) {
      await this.setState({ loadstatus: true })
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.AgreementYears = ex.response.data.data;
        await this.setState({ errors });
        setTimeout(async () => {
          await this.setState({ loadstatus: false })
        }, 2000);

      }
    }

    // this.props.history.push("/admin/addemployee");
  };

  render() {

    const { loadstatus, maxdate, mindate } = this.state
    return <div>
      <Sidebar />
      {/* <NavBar/> */}
      <Col lg="6" md="7" style={{ marginLeft: "20%", paddingTop: "auto", position: 'absolute' }}>
        <Card className="bg-secondary shadow border-0" >
          <CardHeader className="bg-gradient-success border-0">
            <Col style={{ marginLeft: '200px', paddingBottom: '10px' }} xs="8">
              <h3 className="mb--3">Add New Employee</h3>
            </Col>

          </CardHeader>
          <CardBody className="px-lg-3 py-sm-5">
            <Form role="form" onSubmit={this.handleSubmit}>
              <Col sm={{ size: 6 }} style={{ marginLeft: '3px', marginTop: '-0px' }}>
                {this.renderInput("joiningDate", "Joining Date", "date")}
              </Col>

              <Col sm={{ size: 6 }} style={{ marginLeft: '300px', marginTop: '-100px' }} className='mr-sm-2'>
                {this.renderInput("EmployeeName", "Employee Name")}
              </Col>

              <Col sm={{ size: 6 }} style={{ marginLeft: '3px', marginTop: '-0px' }}>
                {this.renderInput("Phone", "Phone")}
              </Col>

              <Col sm={{ size: 6 }} style={{ marginLeft: '300px', marginTop: '-100px' }} className='mr-sm-2'>
                {this.renderInput("Email", "Email ID")}
              </Col>

              <Col sm={{ size: 6 }} style={{ marginLeft: '3px', marginTop: '-0px' }}>
                {this.renderInput("Role", "Designation")}
              </Col>

              <Col sm={{ size: 6 }} style={{ marginLeft: '300px', marginTop: '-100px' }} className='mr-sm-2'>
                {this.renderInput("DateOfBirth", "Date Of Birth", "date", maxdate,)}
              </Col>

              <Col sm={{ size: 6 }} style={{ marginLeft: '3px', marginTop: '-0px' }}>
                {this.renderInput("NetSalary", "Net Salary")}
              </Col>

              <Col sm={{ size: 6 }} style={{ marginLeft: '300px', marginTop: '-100px' }} className='mr-sm-2'>
                {this.renderInput("AgreementYears", "Agreement Years", 'number', '3', '0')}
              </Col>
              <Col row style={{ marginLeft: '250px', marginTop: '0px', marginBottom: '0px' }} >
                <Button disabled={loadstatus} style={{ background: '#2DCECB', color: 'black', border: 'none' }} className="my-2" color="primary" type="submit">
                  Add
                </Button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>;
  }
}

export default AddNew;