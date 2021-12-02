import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { checkIn } from "../../services/inService";
import { getEmployees } from "../../services/userService";
import { checkOut } from "../../services/outService";
import Forms from "../../components/Common/form";
import ESidebar from "../../components/Sidebar/eSidebar";
import ENavBar from "components/Common/enavbar";

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

class TimeCard extends Forms {
  state = { inTime: "", outTime: "" };
  schema = {
    inTime: Joi.string(),
    outTime: Joi.string(),
  };

  doIn = async () => {
    var today = new Date(),
      time = today.getHours() + ":" + today.getMinutes();
        console.log(time)
    // if (time > "09:30") return toast.error("Contract Admin");
    try {
      await this.setState({ inTime: time });
      await checkIn(this.state.inTime);
      // await getEmployees();
      this.props.history.push("/employee/inTime");
      if (this.state) {
        toast.success("Work Started!!!");
      }
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/edashboard";
      }, 2000);
      const { state } = this.props.location;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.inTime = ex.response.inTime;
        toast.warn("Already Checked In!!!");
        this.setState({ errors });
      }
    }
  };

  doOut = async () => {
    var today = new Date(),
      time = today.getHours() + ":" + today.getMinutes();

    try {
      await this.setState({ outTime: time });
      await checkOut(this.state.outTime);
      // await getEmployees();
      this.props.history.push("/employee/outTime");
      if (this.state) {
        toast.success("Work Closed!!!");
      }
      const { state } = this.props.location;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.outTime = ex.response.outTime;
        toast.warn("Already Checked Out!!!");
        this.setState({ errors });
      }
    }
  };

  handleCheckin = () => {
    var today = new Date(),
      time = today.getHours() + ":" + today.getMinutes();

    if (time === "24:00") {
    }
  };

  render() {
    return (
      <div>
        <div
          className="container"
          style={{ paddingLeft: "400px", paddingRight: "300px" }}
        >
          <Card
            style={{ marginTop: "40px" }}
            className="bg-secondary shadow border-0"
          >
            <CardBody className="px-lg-7 py-lg-1">
              <h1 style={{ textAlign: "center" }}>Welcome !!!</h1>

              <h3
                class="card-title"
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                {new Date().toLocaleDateString()}
              </h3>
              <Row style={{ paddingLeft: "12px" }}>
                <Button
                  style={{ background: "#B965E0", border: "none" }}
                  onClick={this.doIn}
                  className="  my-4"
                  color="primary"
                  type="submit"
                >
                  Check In
                </Button>
                <Button
                  style={{ background: "#B965E0", border: "none" }}
                  onClick={this.doOut}
                  className=" my-4"
                  color="primary"
                  type="submit"
                >
                  Check Out
                </Button>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default TimeCard;
