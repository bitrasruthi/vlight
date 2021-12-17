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
    showPopup: true
  };

  onReject = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Rejected";
      await this.setState({ leave });
      // toast.success('Leave Rejected')

      console.log(leave);
      await leavestatus({ _id: leave._id, status: leave.status });
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
      await leavestatus({ _id: this.props.leaveid , status: leave.status });
      window.location = "/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };
  
  
  render() {
    return (
      <div style={{marginTop: '20px', height:'400px', width:'600px'}}  >
              <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none' }}
               variant="contained" onClick={this.onApprove}>
                Approve
              </Button>
              <Button style={{ marginLeft: '', marginTop: '0px', background: '#2DCECA', border: 'none' }} variant="contained" onClick={this.onReject}>
                Reject
              </Button>
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
