import React from 'react';
import auth from '../../services/authService'
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { Switch, Redirect } from 'react-router-dom';
import empauth from "../../services/empservice";
import routes from 'routes.js';
import { Link } from "react-router-dom";
import Forms from './../Common/form';

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

class ELogin extends Forms {
  state = {  data: {EmployeeId: "", Password: ""} , errors: {} };
  schema = {
    EmployeeId: Joi.string().required(),
    Password: Joi.string().required(),
  };
 
//   validate = () => {
//     const options = { abortEarly: false };
//     const { error } = Joi.validate(this.state.data.EmployeeId, this.state.data.Password, this.schema, options);

//     if (!error) return null;

//     const errors = {};
//     for (let item of error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   validateProperty = ({ name, value }) => {
//     const obj = { [name]: value };

//     const schema = { [name]: this.schema[name] };
//     const { error } = Joi.validate(obj, schema);
//     return error ? error.details[0].message : null;
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     const errors = this.validate();
//     this.setState({ errors: errors || {} });

//     if (errors) return;
//     this.doSubmit();
//   };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const jwt = await empauth.login(data.EmployeeId, data.Password);
      console.log(jwt);
      // this.props.history.push('/');
      if (jwt.token) {
        toast.success("Login Successful");
        setTimeout(() => {
          window.location = state ? state.from.pathname : "/dashboard";
        }, 2000);
        const { state } = this.props.location;
      } else {
        toast(jwt.data);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.EmployeeId = ex.response.data.data;

        this.setState({ errors });
      }
    }
  };


  render() {  
return (
    <>
      <div className="header bg-gradient-success py-7 py-lg-3 ">
    <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img 
              alt="..."
              src={
                require("../../assets/img/brand/codegenefull.png").default
              }
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/brand/codegenefull.png")
                          .default
                      }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {/* <NavItem style={{color: 'purple'}}>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <i className="ni ni-planet" style={{color: 'black'}} />
                  <span style={{color: 'purple'}}className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem> */}
              <NavItem >
                <NavLink
                  className="nav-link-icon"
                  to="/elogin"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span style={{color: '#172B4D'}}  className="nav-link-inner--text">Employee</span>
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink className="nav-link-icon" to="login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span style={{color: '#172B4D'}}  className="nav-link-inner--text">Admin</span>
                </NavLink>
              </NavItem>
              {/* <NavItem >
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                >
                  <i className="ni ni-single-02" style={{color: 'black'}}/>
                  <span style={{color: 'purple'}} className="nav-link-inner--text">Profile</span>
                </NavLink>
              </NavItem> */}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      <Container>
            <div className="header-body text-center ">
              <Row className="justify-content-center">
                <Col lg="5" md="5">
                  <h1  className="text-white">Welcome to CG HR Portal!</h1>
                </Col>
              </Row>
            </div>
          </Container>
      <Col lg="5" md="7" style={{marginLeft:"30%", paddingTop: "28px"}}>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4 style={{color: '#172B4D'}} >Employee Login</h4>
            </div>
            <Form role="form" onSubmit={this.handleSubmit}>
            {this.renderInput("EmployeeId", "Employee ID")}
            {this.renderInput("Password", "Password", "Password")}
   
              
              <div className="text-center">
                <Button style={{background: '#172B4D', border: 'none'}} className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
      <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
      </div>

    </>
  );
}
};

export default ELogin;
