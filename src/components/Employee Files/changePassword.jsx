import React from "react";
import Joi from "joi-browser";
import ESidebar from "../Sidebar/eSidebar";
import emp from "../../services/empservice";
import { toast } from "react-toastify";
import Forms from './../Common/form';
import { Card, Col, CardHeader, Button, CardBody } from 'reactstrap'
import ENavBar from 'components/Common/enavbar';

class ChangePassword extends Forms {
  state = {
    data: {
      oldPassword: "",
      newPassword: "",
      conformPassword: "",
    },
    loadstatus: false,
    errors: [],
  };

  schema = {
    oldPassword: Joi.string().min(5).required(),
    newPassword: Joi.string().min(5).required(),
    conformPassword: Joi.string().min(5).required(),
  };

  doSubmit = async () => {
    this.setState({ loadstatus: true })
    try {
      const { data } = this.state;
      await emp.changepassword(data);
      toast.success("Password Updated");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/elogin";
      }, 2000);
      const { state } = this.props.location;
      // await emp.logout();
      this.setState({ loadstatus: false })
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.oldPassword = ex.response.data.data;
        this.setState({ errors });
        this.setState({ loadstatus: true })

      }
    }
  };

  render() {
    return (
      <div>
        <ESidebar />
        {/* <ENavBar/> */}
        <Col lg="5" md="7" style={{ marginLeft: "25%", paddingTop: "px", position: 'absolute' }}>
          <Card className=" shadow border-0" >
            <CardHeader className="bg-gradient-purple border-0">
              <Col style={{ marginLeft: '160px', paddingBottom: '10px' }} xs="8">
                <h3 className="mb--3">Change Password</h3>
              </Col>

            </CardHeader>
            <CardBody className="px-lg-3 py-sm-5">
              <form inline onSubmit={this.handleSubmit}>
                {this.renderInput("oldPassword", "Old Password", 'password')}
                {this.renderInput("newPassword", "New Password", 'password')}
                {this.renderInput("conformPassword", "Confirm Password", 'password')}
                {/* {this.renderButton("Submit")} */}
                <div style={{ textAlign: 'center' }}>
                  <Button disabled={this.validate()} style={{ marginLeft: '0px', marginTop: '0px', background: '#B665E0', color: 'white', border: 'none' }} variant="contained" onClick={this.onApprove}>
                    Submit
                  </Button>

                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default ChangePassword;