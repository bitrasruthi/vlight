import React from "react";
import get_leavelist from "../../reduxstore/actions/leaveAction";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Forms from "../Common/form";
import { leavestatus } from "../../services/leaveService";
import { toast } from "react-toastify";
import { deleteEmp } from "services/authService";
import Joi from 'joi-browser';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
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
      Reason: '',
      AgreementDone: '',
    },
    leaveid:{},
    errors: [],
    employees: [],
    showPopup: true
  };

  schema = {
    // EmployeeId: Joi.string().required(),
    Reason: Joi.string().required(),
    AgreementDone: Joi.string().required(),
  };

 
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
    try {
      // const id = this.props.match.params.id
      console.log(this.props.leaveid);

      const data = { ...this.state.data, EmployeeId: this.props.leaveid }
      await this.setState({ data })
      const pp = await terminateEmp(data);
      await this.setState({ data: pp });
      toast.success('Employee Terminated Successfully')
      window.location = "/emplist";


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
     

      <div style={{marginTop: '0px', height:'430px', width:'350px',marginRight: "-0px" }}  >
      <Col lg="9" md="9" style={{ marginLeft: '25px',
      height:'400px', width:'650px',marginRight: "-0px", paddingTop: "auto", position: 'absolute',marginTop: '20px', }}>
      <Card className="bg-secondary shadow border-0" >
        <CardHeader className="bg-gradient-success border-0">
          <Col style={{ marginLeft: '30px', paddingBottom: '10px' }} xs="9">
            <h3 className="mb--3">Termination</h3>
          </Col>
        </CardHeader>
        <CardBody style={{textAlign: 'center'}} className="px-lg-3 py-sm-5">
                    <Form role="form" style={{ textAlign: 'left' }} onSubmit={this.handleSubmit}>
                      {/* {this.renderInput("EmployeeId", "Employee Id",)} */}
                      {this.renderInput("Reason", "Reason",)}
                      {/* <input type="radio" name="option" id="1" value="Yes" />
                      <input type="radio" name="option" id="2" value="No" /> */}
                      {this.renderInput("AgreementDone", "Agreement Period Completed?",)}
                      <div style={{ marginTop: '20px', marginLeft: '30px' }}  >
                        <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none' }} variant="contained" onClick={this.handleSubmit}>
                          Terminate Employee
                        </Button>
                        
                      </div>
                    
                    </Form>
                  </CardBody>
                
                </Card>
                </Col>
              <div>
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

