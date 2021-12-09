import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

import ESidebar from "../Sidebar/eSidebar";
import Joi from "joi-browser";
import { applyLeave } from "services/leaveService";

import Forms from "../Common/form";
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

class LeaveForm extends Forms {
  state = {
    data: {
      from_Date: "",
      to_Date: "",
      subject: "",
      reason: "",
      leave_type: "",
      To: "",
    },
    errors: [],
    options: [" select", "Casual Leave", "Sick Leave"],
    To: ["select", "Admin"],
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const dd = await applyLeave(data);
      
      toast.success(dd.data);
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/leavsList";
      }, 2000);

      const { state } = this.props.location;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.from_Date = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };

  schema = {
    from_Date: Joi.date().required(),
    to_Date: Joi.date().required(),
    subject: Joi.string().required(),
    reason: Joi.string().required(),
    leave_type: Joi.string().required(),
    To: Joi.string().required(),
  };

  render() {
    const { options, To } = this.state;
    return (
      <div>
        <ESidebar />
        <h2> Leave Form </h2> <br />
        <Col lg="6" md="7" style={{marginLeft:"25%", paddingTop: "auto", position: 'absolute'}}>
        <Card className="bg-secondary shadow border-0" >
        <CardHeader className="bg-white border-0">
                    <Col style={{marginLeft: '220px', paddingBottom: '10px'}} xs="8">
                      <h3  className="mb--3">Leave Form</h3>
                    </Col>
                    
                </CardHeader>
          <CardBody className="px-lg-3 py-sm-5">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("from_Date", "From Date", "date")}
            {this.renderInput("to_Date", "To Date", "date")}
            {this.renderInput("subject", "Subject")}
            {this.renderInput("reason", "Reason")}
            {this.renderDropdown("leave_type", "Leave Type", options)}
            {this.renderDropdown("To", "To", To)}

            {this.renderButton("Submit")}
          </form>
          </CardBody>
          </Card>
          </Col>
        </div>
    );
  }
}

export default LeaveForm;
