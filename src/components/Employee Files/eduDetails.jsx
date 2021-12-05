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
import ESidebar from 'components/Sidebar/eSidebar';
  // core components

  class EduDetails extends Forms{
      state={
           data:  {qualification:'', institute: "", passedoutYear: '', percentage: ''},
      employees: [],
      pageSize: 4,
      id:[],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "FirstName", order: "asc" },
      }

      schema = {
        qualification: Joi.string().required(),
        institute: Joi.string().required(),
        passedoutYear: Joi.string().required(),
        percentage: Joi.string().required(),
       
      };

      handlePageChange = (page) => {
        this.setState({ currentPage: page });
      };
    
      handleSort = (sortColumn) => {
        this.setState({ sortColumn });
      };

      getPageData = () => {
        const {
          pageSize,
          currentPage,
          employess: allemployess,
    
          sortColumn,
        } = this.state;
    
        let filtered = allemployess;
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const employess = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: employess };
      };
    

      doSubmit = async () => {
        try {
          const { data } = this.state;
         await registerEduDetails(data);
        //   console.log(tt);
          toast.success("Education details Updated Successfully");
          setTimeout(() => {
            window.location = state ? state.from.pathname : "/profile";
          }, 2000);
          const { state } = this.props.location;
        //   await getEduDetails();
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.qualification = ex.response.data;
            this.setState({ errors });
          }
        }
    }
  

//      async componentDidMount() {
    
//     const {data:EducationalDetails} = await getEduDetails();
//    console.log(EducationalDetails);
 
//   this.setState({data: {qualification:EducationalDetails.qualification, institute:EducationalDetails.institute, 
//     passedoutYear:EducationalDetails.passedoutYear, percentage: EducationalDetails.percentage } });
// }

   
    
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
                <Form  role="form" onSubmit={this.handleSubmit}>
               
                {this.renderInput("qualification", "Qualification", )}
                {this.renderInput("institute", "Institute",)}
                {this.renderInput("passedoutYear", "Year of Pass",)}
                {this.renderInput("percentage", "Percentage",)}
            
                <div className="text-center">
                <Button style={{background: '#B965E0', marginTop: '0px', marginLeft: '0px',border: 'none'}} 
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
  
  export default EduDetails;
  