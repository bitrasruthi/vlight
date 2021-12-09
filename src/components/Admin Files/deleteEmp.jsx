import React from "react";
import get_leavelist from "../../reduxstore/actions/leaveAction";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Forms from "../Common/form";
import  {leavestatus}  from "../../services/leaveService";
import { toast } from "react-toastify";
import { deleteEmp } from "services/authService";
import  Joi from 'joi-browser';

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
import get_employeelist from 'reduxstore/actions/employeeAction';
import { terminateEmp } from 'services/terminateService';

class DeleteEmp extends Forms {
  state = {
    data: {
      EmployeeId: "",
     Reason: '',
     AgreementDone: '',
    },
    errors: [],
    employees: [],
    showPopup: true
  };

  schema = {
    EmployeeId: Joi.string().required(),
    Reason: Joi.string().required(),
    AgreementDone: Joi.string().required(),
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  // handleDelete = async (emp) => {
  //   console.log(this.props.match.params.id)
  //   const originalemployees = this.state.employees;
  //   const empl = originalemployees.filter((m) => m._id !== emp._id);
  //   try {
  //     await deleteEmp(this.props.match.params.id);

  //     // setTimeout(async () => {}, 1000);
  //     this.setState({ employees: empl });
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400)
  //       toast("This Employee already been deleted");
  //     this.setState({ employees: originalemployees });
  //   }
  // };
  
  doSubmit = async (emp) => {
      const {data: temp} = this.state
      const tt = temp;
      console.log(tt);
      // const originalemployees = this.state.employees;
      // const empl = originalemployees.filter((m) => m.id !== emp._id);
      try {
     const pp = await terminateEmp(temp.EmployeeId);
    await this.setState({ data: pp});
    console.log(pp);
 
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.EmployeeId = ex.response.data.data;
        this.setState({ errors });
      }
    
  }
  };


  async componentDidMount() {
    if (!this.props.getemployeelist) {
      await get_employeelist();
    }
    const dd = await this.props.getemployeelist;
    // console.log(dd);
    await this.setState({ employees: dd });
    // await this.setState({ isLoading: false });
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
          <div style={{borderRadius: '30px', height: "430px",zIndex: 1001, 
          marginLeft: '450px',marginTop: '150px' ,width: "400px", background: 'white'}}>
            <div style={{marginTop:'' }}>
            {/* {/* <h5 style={{fontSize: '20px', paddingTop: '5px'}}>Employee Id: {this.state.employees.EmployeeId}</h5> */}
            <h5 style={{fontSize: '20px',}}>Are you sure? You want to delete this employee? If Yes, please enter following</h5>
            <Form role="form" onSubmit={this.handleSubmit}>                  
                  {this.renderInput("EmployeeId", "Employee ID")}
                  {this.renderInput("Reason", "Reason",)}
                  {this.renderInput("AgreementDone", "Agreement Period Completed?", )}

        <Button style={{marginLeft: '0px', marginTop: '10px', background: '#2DCE8A', border: 'none'}} 
        type="submit" variant="contained">
          Terminate
        </Button>
                  </Form>
            </div>
        {this.state.showPopup ? <Button  style={{marginLeft: '400px',boxShadow: 'none' , background: 'transparent', border: 'none',marginTop: '-200px'}}
         href='/emplist'>
        <i style={{fontSize: '20px'}} class="far fa-times-circle"></i></Button>
         : null}
        <Button style={{marginLeft: '', marginTop: '10px', background: '#f58078', border: 'none'}} variant="contained" href='/emplist'>
          Cancel
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
      getemployeelist: state.getemployeelist,
    };
  };
  
  export default connect(mapStateToProps)(DeleteEmp);
  
