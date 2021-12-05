import React from 'react';
import {toast} from 'react-toastify'
import _ from 'lodash'
import UserHeader from "components/Headers/UserHeader.js";
import  {getProDetails} from '../../services/profileService';
import  {profileRegister}  from '../../services/profileService';
import paginate from "../Common/paginate";
import Joi from 'joi-browser';
import Forms from 'components/Common/form';
import get_employeelist  from 'reduxstore/actions/employeeAction';
import { getEmployees } from './../../services/userService';
import { getEduDetails } from 'services/eduService';
import { registerEduDetails } from 'services/eduService';
import ESidebar from 'components/Sidebar/eSidebar';
import { registerJobDetails } from 'services/jobService';
import { getJobDetails } from 'services/jobService';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";
  // core components

  class JobDetails extends Forms{
      state={
          data: { companyName:'', Experience: "", Role: '', from_upto: ''},
      employees: [],
      pageSize: 4,
      id:[],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "FirstName", order: "asc" },
      }

      schema = {
        companyName: Joi.string().required(),
        Experience: Joi.string().required(),
        Role: Joi.string().required(),
        from_upto: Joi.string().required(),
       
      };

      doSubmit = async () => {
        try {
          const { data } = this.state;
          const tt = await registerJobDetails(data);
          toast.success("Job details Updated Successful");
          setTimeout(() => {
            window.location = state ? state.from.pathname : "/profile";
          }, 2000);
          const { state } = this.props.location;
          await getJobDetails();
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.qualification = ex.response.data.data;
            this.setState({ errors });
          }
        }
    }
  

    // async componentDidMount() {
    //     // this.doSubmit();
    //     // const tt = getEmployees();
    //     // console.log(tt);
       
    //       const {data:profile} = await getEduDetails();
    //       let pp = profile[0].profile;
    //       console.log(pp);
    //       this.setState({ data: this.mapToViewModel(pp) });
    //      if(pp===[]){this.doSubmit();}
       
    //   }

    mapToViewModel(pro) {
        return {
          FirstName: pro.FirstName,
          MiddleName: pro.MiddleName,
          LastName: pro.LastName,
          Country: pro.Country,
          City: pro.City,
          Address: pro.Address,
          Pincode:pro.Pincode,
          AboutMe: pro.AboutMe,
          EducationDetails: pro.EducationDetails
        };
      }    
    
      render() { 
    return (
      <>
    <div style = {{height: '', position: "absolute", left: '0', width: '100%', }} 
      className=" py-2 py-sm-3 ">
        <ESidebar />
        <Row>
        <Col  lg="3" md="7" style={{marginLeft:"16rem", paddingTop: "px", position: 'absolute', }}>
              <Card className="bg-secondary shadow">
                <CardBody>
                <Form  role="form"
                onSubmit={this.handleSubmit}
                style={{
                  padding: "auto",
                  textAlign: "",
                  color: "",}}>
                {this.renderInput("companyName", "Company Name", )}
                {this.renderInput("Experience", "Years of Experience",)}
                {this.renderInput("Role", "Designation",)}
                {this.renderInput("from_upto", "Worked From - To",)}
            
                <div className="text-center">
                <Button style={{background: '#B965E0', marginTop: '450px', marginLeft: '700px',border: 'none'}} 
                className="" color="primary" type="submit">
                  Update
                </Button>
              </div>
                </Form>
                </CardBody>
              </Card>
            </Col>
           
            </Row>
        </div>
      </>
    );
  };
}
  
  export default JobDetails;
  