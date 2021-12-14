import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { checkIn } from "../../services/inService";
import { checkOut } from "../../services/outService";
import Forms from "../../components/Common/form";
import { gettime } from '../../services/settings'


import {
  Button,
  Card,
  CardBody,

  Row,
} from "reactstrap";

class TimeCard extends Forms {
  state = { inTime: "", outTime: "", timelimit: '' };
  schema = {
    inTime: Joi.string(),
    outTime: Joi.string(),

  };

  doIn = async () => {
    var today = new Date()
    var myNumber = today.getMinutes();
    var formattedNumber = ("0" + myNumber).slice(-2);
    var time = today.getHours() + ":" + formattedNumber;
    try {

      await this.setState({ inTime: time });
      var send1 = { inTime: this.state.inTime, timelimit: this.state.timelimit }
      const res = await checkIn(send1);
      if (res.data) toast.error(res.data)

      toast.success("Work Started!!!");

      const { state } = this.props.location;
    } catch (ex) {
      console.log(ex)
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.inTime = ex.response.inTime;
        toast.warn("Already Checked In!!!");
        this.setState({ errors });
      }
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.inTime = ex.response.inTime;
        toast.warn("Contact Admin");
        this.setState({ errors });
      }
    }
  };

  doOut = async () => {
    var today = new Date();
    var myNumber = today.getMinutes();
    var formattedNumber = ("0" + myNumber).slice(-2);
    var time = today.getHours() + ":" + formattedNumber;

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
  async componentDidMount() {
    const time = await gettime()
    const present = { ...time.data[0] }

    await this.setState({ timelimit: present.inTime })
  }


  render() {
    return (
      <div>
        <div className="container" style={{ paddingLeft: "400px", paddingRight: "300px", marginLeft: '-210px',paddingTop: "200px" }}>
          <Card
            style={{ marginTop: "-80px", }}
            className="bg-secondary shadow border-0"
          >
            <CardBody className="px-lg-7 py-lg-1">
              <h1 style={{ textAlign: "center" }}>Welcome !!!</h1>

              <h3
                className="card-title"
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
