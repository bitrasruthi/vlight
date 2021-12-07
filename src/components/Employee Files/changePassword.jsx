import React from "react";
import Joi from "joi-browser";
import ESidebar from "../Sidebar/eSidebar";
import emp from "../../services/empservice";
import { toast } from "react-toastify";
import Forms from './../Common/form';
import {Card, Col, CardBody} from 'reactstrap'
import ENavBar  from 'components/Common/enavbar';

class ChangePassword extends Forms {
  state = {
    data: {
      oldPassword: "",
      newPassword: "",
      conformPassword: "",
    },
    errors: [],
  };

  schema = {
    oldPassword: Joi.string().min(5).required(),
    newPassword: Joi.string().min(5).required(),
    conformPassword: Joi.string().min(5).required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await emp.changepassword(data);
      toast.success("Password Updated");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/elogin";
      }, 2000);
      const { state } = this.props.location;
      await emp.logout();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.oldPassword = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
          <ESidebar/>
          <ENavBar/>
        <Col lg="5" md="7" style={{marginLeft:"30%", paddingTop: "115px", position: 'absolute'}}>
        <Card className="bg-secondary shadow border-0" >
          <CardBody className="px-lg-3 py-sm-5">
          <form onSubmit={this.handleSubmit}>
              {this.renderInput("oldPassword", "Old Password")}
              {this.renderInput("newPassword", "New Password")}
              {this.renderInput("conformPassword", "Confirm Password")}
              {this.renderButton("Submit")}
            </form>
            </CardBody>
            </Card>
            </Col>
      </div>
    );
  }
}

export default ChangePassword;