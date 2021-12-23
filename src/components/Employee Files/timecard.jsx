import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { checkIn } from "../../services/inService";
import { checkOut } from "../../services/outService";
import Forms from "../../components/Common/form";
import { gettime } from '../../services/settings'
import { getCurrentUser } from "services/authService";


import {
  Button,
  Card,
  CardBody,

  Col,

  Row,
} from "reactstrap";

class TimeCard extends Forms {
  state = { inTime: "", outTime: "", timelimit: '', disabled: false, name: '', };
  schema = {
    inTime: Joi.string(),
    outTime: Joi.string(),
    

  };

  doIn = async () => {
    await this.setState({ disabled: true })
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
        await this.setState({ disabled: true })
        this.setState({ errors });
      }
      if (ex.response && ex.response.status === 402) {
        const errors = { ...this.state.errors };
        errors.inTime = ex.response.inTime;
        toast.warn("You are too late!!! please contact Admin");
        await this.setState({ disable: true })
        this.setState({ errors });
      }
    }
  };

  doOut = async () => {
    await this.setState({ disabled: true })

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
        toast.warn(ex.response.data.data);
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
    const pp = await getCurrentUser();
            this.setState({name: pp.EmployeeName})
            console.log(this.state.name);
            
    await this.setState({ disabled: true })
    const time = await gettime()
    const present = { ...time.data[0] }

    await this.setState({ timelimit: present.inTime })
    await this.setState({ disabled: false })

  }


  render() {
    return (
      <div>
        <div className="container" style={{ paddingLeft: "400px", paddingRight: "300px", marginLeft: '-210px', paddingTop: "200px" }}>
          <Card
            style={{ marginTop: "-0px", }}
            className="bg-secondary shadow border-0"
          >
            <CardBody className="px-lg-7 py-lg-1">
              <Col style={{ textAlign: "center", marginLeft: '-70px', marginTop: '40px', marginBottom: '35px' }} >
              <h1 style={{ textAlign: "center", paddingLeft: '0px', width: '300px', }}>Welcome <span className="text-uppercase">{this.state.name}</span></h1>
              </Col>
              <h3
                className="card-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
               Today:  {new Date().toLocaleDateString()}
              </h3>
              <Row style={{ paddingLeft: "12px" }}>
                <Button
                  style={{ background: "#B965E0", border: "none" }}
                  onClick={this.doIn}
                  disabled={this.state.disabled}
                  className="  my-4"
                  color="primary"
                  type="submit"
                >
                  Check In
                </Button>
                <Button
                  style={{ background: "#B965E0", border: "none" }}
                  onClick={this.doOut}
                  disabled={this.state.disabled}
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
