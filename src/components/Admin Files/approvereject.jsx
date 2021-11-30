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

class ApproveReject extends Forms {
  state = {
    leave: {},
    toggle: false,
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
    console.log(this.state);
  }

  onReject = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Rejected";
      await this.setState({ leave });
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
      // console.log(leave._id);
      await leavestatus({ _id: leave._id, status: leave.status });
      window.location = "/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };

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
        <Button variant="contained" onClick={this.onApprove}>
          Approve
        </Button>
        <Button variant="contained" onClick={this.onReject}>
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
