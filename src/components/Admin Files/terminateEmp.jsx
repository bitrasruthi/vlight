import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import  Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
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
import { terminateEmp } from 'services/terminateService';


class TerminateEmp extends Forms {
    state = {
        data: {
          EmployeeId: "",
         Reason: '',
         AgreementDone: '',
        },
        errors: [],
      };
    
      schema = {
        EmployeeId: Joi.string().required(),
        Reason: Joi.string().required(),
        AgreementDone: Joi.string().required(),
      };


     
    
    render() { 
        return <div  style = {{height: '', position: "absolute", left: '0', width: '100%',}} 
        className=" py-5 py-sm-1 ">
            <Sidebar/>
            <Col lg="5" md="7" style={{marginLeft:"35%", paddingTop: "10px", position: 'absolute'}}>
        <Card className="bg-secondary shadow border-0" >
          <CardBody className="px-lg-3 py-sm-5">
            <Form role="form" onSubmit={this.handleSubmit}>
                  
                  {this.renderInput("EmployeeId", "Employee ID")}
                  {this.renderInput("Reason", "Reason",)}
                  {this.renderInput("AgreementDone", "Agreement Period Completed?", )}
                
              <div className="text-center">
                <Button style={{background: '#f58078', border: 'none'}} className="my-4" color="primary" type="submit">
                  Terminate Employee
                </Button>
              </div>
            </Form>
            </CardBody>
            </Card>
            </Col> 
          
                   </div>;
    }
}
 
export default TerminateEmp;