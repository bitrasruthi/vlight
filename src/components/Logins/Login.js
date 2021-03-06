import React from 'react';
import auth from '../../services/authService'
import Joi from "joi-browser";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Forms from '../../components/Common/form';

import {
  Button,
  Card,
  CardBody,
  Form,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class Login extends Forms {
  state = {  data: {Email: "", Password: ""} , errors: {} , loadstatus:false };
  schema = {
    Email: Joi.string().required().email(),
    Password: Joi.string().min(5).required(),
  };
   
  doSubmit = async () => {
    await this.setState({ loadstatus: true })
    try {
      const { data } = this.state;
       await auth.login(data.Email, data.Password);
      this.props.history.push('/');
      if (data) {
        toast.success("Login Successful");
      }
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/home";
      }, 2000);
      const { state } = this.props.location;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.Email = ex.response.data.data;
         await this.setState({ errors });
        setTimeout( async () => {
        await this.setState({ loadstatus: false })     
        }, 2000);
      }
    }
  };


  render() {  
    return (
     
  <div style = {{height: '100%', position: "absolute", left: '0', width: '100%',overflow: 'hidden'}} className="header bg-gradient-success py-7 py-lg-3 ">
    
    <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container fluid className="px-4">
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
              {/* <Row> */}
                {/* <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/brand/codegenefull.png")
                          .default
                      }
                    />
                  </Link>
                </Col> */}
                {/* <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row> */}
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
                  <span style={{color: 'white'}} className="nav-link-inner--text">Employee</span>
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink className="nav-link-icon" to="/login" tag={Link}>
                  <i className="ni ni-key-25"/>
                  <span style={{color: 'white'}} className="nav-link-inner--text">Admin</span>
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
          
      <Col lg="5" md="7" style={{marginLeft:"30%", marginTop: '20px'}}>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4 style={{color: '#172B4D'}}>Admin Login</h4>
            </div>
            <Form role="form" onSubmit={this.handleSubmit}>
                  
                  {this.renderInput("Email", "Email Id")}

             
                  {this.renderInput("Password", "Password", "Password")}
                
              <div className="text-center">
                <Button disabled={this.state.loadstatus} style={{background: '#172B4D', border: 'none'}} className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          <Row className="mt-3">
          {/* <Col xs="6">
            <a
              className="text-success"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              >
              <small>Forgot password?</small>
            </a>
          </Col> */}
          {/* <Col className="text-right" xs="6">
            <a
              className="text-success"
              href="/register"
              >
              <small>Create new account</small>
            </a>
          </Col> */}
        </Row>
              </CardBody>
        </Card>
       
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
      

    
  );
}
};

export default Login;
