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
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
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
      // console.log(leave._id);
      await leavestatus({ _id: leave._id, status: leave.status });
      window.location = "/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };

  async componentDidMount() {
    if (!this.props.getleavelist) {
      await get_leavelist();
    }
    // const {data:movies} = await getMovies();
    const leavelist = await this.props.getleavelist;
    let leaveid = this.props.match.params.id;
    let leave = leavelist.find((obj) => obj._id === leaveid);

    await this.setState({ leave });
    console.log(leave);
  }


  render() {
    return (
      <div
        className="col-md-4 col-md-offset-4 centered"
        style={{ margin: "auto" }}
      >
        <Sidebar />

        {/* <p> from Date :- {leave.from_Date} </p>
        <p> TO Date :- {leave.to_Date} </p>
        <p> from subject :- {leave.subject} </p>
        <p> from Reason :- {leave.reason} </p>
        <p> from Leave Type :- {leave.leave_type} </p> */}

        <div className='popup' style={{
          paddingRight: 'auto',
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0",
          left: " 0",
          right: "0",
          bottom: "0",
          margin: "auto",
          zIndex: '1001',
          backgroundColor: "rgba(0,0,0, 0.5)"
        }}>
          <div style={{
            background: 'transparent', marginLeft: '800px', paddingRight: '0px',
            position: "absolute",
            textAlign: 'center',
            margin: "auto"
          }} className='popup_inner'>
            <div style={{
              borderRadius: '30px', height: "300px", zIndex: 1001,
              marginLeft: '380px', marginTop: '100px', width: "600px", background: 'white'
            }}>
               {/* <Col lg="6" md="7" style={{ marginLeft: "25%", paddingTop: "auto", position: 'absolute' }}> */}
        <Card className="bg-secondary shadow border-0" >
          <CardHeader className="bg-gradient-success border-0">
            <Col style={{ marginLeft: '100px', paddingBottom: '10px' }} xs="8">
              <h3 className="mb--3">Leave Details</h3>
            </Col>

          </CardHeader>
          <CardBody  className="px-lg-3 py-sm-5">
            <div style={{marginLeft: '20px'}} >
          <div class="row">
  <div class="column">
              <h3 style={{ fontWeight: '', }}> Employee Id:</h3>
  </div>
  <div class="column">

              <span style={{  paddingTop: '5px' }}> {this.state.leave.EmployeeId}</span>
  </div>
  <div style={{marginLeft: '80px'}} class="column">
              <span style={{ fontWeight: 'bold', }}>Employee Name: </span>              
  </div>
  <div  class="column">
                <span style={{ fontSize: '' }}>{this.state.leave.EmployeeName}</span>

  </div>
  </div>
  <br />
  <div class="row">
  <div class="column">
             
              <span style={{ fontWeight: 'bold', }}>From Date: </span>
  </div>
  <div class="column">
                <span style={{ fontSize: '' }}>{this.state.leave.from_Date}</span>

  </div>
  <div style={{marginLeft: '60px'}} class="column">
              <span style={{ fontWeight: 'bold', }}>To Date: </span>
  </div>
  <div class="column">

                <span style={{ fontSize: '' }}>{this.state.leave.to_Date} </span>
  </div>
</div>
<br />
<div class="row">
<div class="column">
            <span style={{ fontWeight: 'bold', }}>Subject: </span>
  </div>
  <div class="column">
                <span style={{ fontSize: '' }}>{this.state.leave.subject}</span>

  </div>

  </div>
  <br />
  <div class="row">
<div class="column">
            <span style={{ fontWeight: 'bold', }}>Reason: </span>
  </div>
  <div class="column">
            <span style={{ fontSize: '' }}> {this.state.leave.reason}</span>

  </div>
  </div>
</div>
  <br />
<div style={{marginTop: '20px'}}  >
            
              <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none' }} variant="contained" onClick={this.onApprove}>
                Approve
              </Button>
              <Button style={{ marginLeft: '', marginTop: '0px', background: '#2DCECA', border: 'none' }} variant="contained" onClick={this.onReject}>
                Reject
              </Button>
              </div>
                </CardBody>
          </Card>
          {/* </Col> */}
              {this.state.showPopup ? <Button style={{ marginLeft: '550px', boxShadow: 'none', background: 'transparent', border: 'none', marginTop: '-820px' }}
                href='/leavelist'>
                <i style={{ fontSize: '20px' }} class="far fa-times-circle"></i></Button>
                : null}
              
            </div>
          </div>
        </div>
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
