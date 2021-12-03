import Dashboard from 'components/Common/dashboard';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './../Common/navbar';
import { getEmployees, register } from "../../services/userService";
import get_employeelist from 'reduxstore/actions/employeeAction';
import  Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
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
      };
    
      doSubmit = async () => {
        try {
          const { data } = this.state;
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
            errors.EmployeeName = ex.response.data.data;
            this.setState({ errors });
          }
        }
    
        // this.props.history.push("/admin/addemployee");
      };
    
    render() { 
        return <div>
            <Sidebar/>
            <NavBar/>
            <Col lg="5" md="7" style={{marginLeft:"30%", paddingTop: "28px"}}>
        <Card className="bg-secondary shadow border-0" >
          <CardBody className="px-lg-3 py-sm-5">
            <Form role="form" onSubmit={this.handleSubmit}>
                  
                  {this.renderInput("EmployeeId", "Employee ID")}
                  {this.renderInput("EmployeeName", "Employee Name")}
                  {this.renderInput("Phone", "Phone")}
                  {this.renderInput("Email", "Email ID")}
                  {this.renderInput("Role", "Designation")}
                  {this.renderInput("DateOfBirth", "Date Of Birth", "date")}             
                  {this.renderInput("NetSalary", "Net Salary")}
                
              <div className="text-center">
                <Button style={{background: '#172B4D', border: 'none'}} className="my-4" color="primary" type="submit">
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