import React from "react";
import get_leavelist from "../../reduxstore/actions/leaveAction";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Forms from "../Common/form";
import { leavestatus } from "../../services/leaveService";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
} from "reactstrap";


class ApproveReject extends Forms {
  state = {
    leave: {},
    data: {},
    showPopup: true
  };

  onReject = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Rejected";
      await this.setState({ leave });
      // toast.success('Leave Rejected')

      console.log(leave);
      await leavestatus({ _id: this.props.leaveid, status: leave.status });
      window.location = "/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };
  onApprove = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Approved";
      await this.setState({ leave });
      // toast.success('Leave Approved')
      // console.log(this.props);
      await leavestatus({ _id: this.props.leaveid, status: leave.status });
      window.location = "/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };

  async componentDidMount() {
    const dd = await this.props.getleavelist;
    // let leaveid = this.state.match.params.id
    await this.setState({ data: dd })
    console.log(this.props.data);
    // let leave = leavelist.find((obj) => obj._id === leaveid);

    // await this.setState({ leave });
    // console.log(leave);
  }

  render() {
    console.log(this.props)
    return (
      <div style={{ marginTop: '0px', height: '430px', width: '350px', marginRight: "-0px" }}  >
        <Col lg="9" md="9" style={{
          marginLeft: '25px',
          height: '400px', width: '650px', marginRight: "-0px", paddingTop: "auto", position: 'absolute', marginTop: '20px',
        }}>
          <Card className="bg-secondary shadow border-0" >
            <CardHeader className="bg-gradient-success border-0">
              <Col style={{ marginLeft: '30px', paddingBottom: '10px' }} xs="9">
                <h3 className="mb--3">Leave Action</h3>
              </Col>
            </CardHeader>
            <CardBody style={{ textAlign: 'center' }} className="px-lg-3 py-sm-5">
              <div style={{ textAlign: 'center' }} className="row">
                <h3>Name: </h3>
                <p style={{ marginLeft: '10px' }}>{this.props.data.EmployeeName}</p>
              </div>
              <div className="row">
                <h3>From Date: </h3>
                <p style={{ marginLeft: '10px' }}>{this.props.data.from_Date}</p>
              </div>
              <div className="row">
                <h3>To Date: </h3>
                <p style={{ marginLeft: '10px' }}>{this.props.data.to_Date}</p>
              </div>
              <div className="row">
                <h3>Subject: </h3>
                <p style={{ marginLeft: '10px' }}>{this.props.data.subject}</p>
              </div>
              <div className="row">
                <h3>Reason: </h3>
                <p style={{ marginLeft: '10px' }}>{this.props.data.reason}</p>
              </div>
              <div style={{ marginTop: '15px' }}>
                <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none' }}
                  variant="contained" onClick={this.onApprove}>
                  Approve
                </Button>
                <Button style={{ marginLeft: '', marginTop: '0px', background: '#2DCECA', border: 'none' }} variant="contained" onClick={this.onReject}>
                  Reject
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getleavelist: state.getleavelist,
  };
};

export default connect(mapStateToProps)(ApproveReject);
