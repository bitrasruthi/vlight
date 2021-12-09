import React from "react";
import get_leavelist from "../../reduxstore/actions/leaveAction";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Forms from "../Common/form";
import  {leavestatus}  from "../../services/leaveService";
import { toast } from "react-toastify";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
  } from "reactstrap";
import LeaveList from "./leavelist";

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
      toast.success('Leave Rejected')

      console.log(leave);
      await leavestatus({ _id: leave._id, status: leave.status });
      // window.location = "/leavelist";
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
      toast.success('Leave Approved')
      // console.log(leave._id);
      await leavestatus({ _id: leave._id, status: leave.status });
      // window.location = "/leavelist";
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
    const { leave } = this.state;
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
        
        <div className='popup' style={{paddingRight: 'auto', 
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left:" 0",
        right: "0",
        bottom: "0",
        margin: "auto",
        zIndex: '1001',
        backgroundColor: "rgba(0,0,0, 0.5)"}}>
          <div style={{background: 'transparent', marginLeft: '800px', paddingRight: '0px',
        position: "absolute",
        textAlign: 'center',
        margin: "auto"}} className='popup_inner'>
          <div style={{borderRadius: '30px', height: "300px",zIndex: 1001, 
          marginLeft: '450px',marginTop: '150px' ,width: "400px", background: 'white'}}>
            <div style={{marginTop:'' }}>
            <p style={{fontSize: '20px', paddingTop: '5px'}}><span style={{fontWeight: 'bold',}}> Employee Id:</span> {this.state.leave.EmployeeId}</p>
            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold',}}>Employee Name: </span>{this.state.leave.EmployeeName}</p>
            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold',}}>From Date: </span>{this.state.leave.from_Date}</p>
            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold',}}>To Date: </span>{this.state.leave.to_Date} </p>
            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold',}}>Subject: </span>{this.state.leave.subject}</p>
            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold',}}>Reason: </span>{this.state.leave.reason}</p>
            </div>
        {this.state.showPopup ? <Button  style={{marginLeft: '400px',boxShadow: 'none' , background: 'transparent', border: 'none',marginTop: '-500px'}}
         href='/leavelist'>
        <i style={{fontSize: '20px'}} class="far fa-times-circle"></i></Button>
         : null}
        <Button style={{marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none'}} variant="contained" onClick={this.onApprove}>
          Approve
        </Button>
        <Button style={{marginLeft: '', marginTop: '0px', background: '#f58078', border: 'none'}} variant="contained" onClick={this.onReject}>
          Reject
        </Button>
        <div>
      </div>
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
