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

  class Profile extends Forms{
      state={
          data: {FirstName: '', MiddleName: '', LastName: '', Address:'', City: '', 
          Country: '', Pincode:'', AboutMe: '', role:''},
      employees: [],
      pageSize: 4,
      id:[],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "FirstName", order: "asc" },
      }

      schema = {
        FirstName: Joi.string().required(),
        MiddleName: Joi.string().required(),
        LastName: Joi.string().required(),
        Address: Joi.string().required(),
        City: Joi.string().required(),
        Country: Joi.string().required(),
        Pincode: Joi.string().required(),
        AboutMe: Joi.string().required(),
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
          const tt = await profileRegister(data);
          toast.success("Profile Updated Successful");
          setTimeout(() => {
            window.location = state ? state.from.pathname : "/edashboard";
          }, 2000);
          const { state } = this.props.location;
          await getProDetails();
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.EmployeeName = ex.response.data.data;
            this.setState({ errors });
          }
        }
    }
  

    // async componentDidMount() {
    //     // this.doSubmit();
    //     // const tt = getEmployees();
    //     // console.log(tt);
       
    //       const {data:profile} = await getProDetails();
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
        };
      }    
    
      render() { 
    return (
      <>
        
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
        <div style = {{height: '', position: "absolute", left: '0', width: '100%', }} 
      className=" py-4 py-sm-3 ">
          <Row style={{marginTop: '220px', marginLeft: '3rem'}}>
            <Col  className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card style={{marginRight: '-270px'}} className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={
                            require("../../assets/img/theme/nature.jpg")
                              .default
                          }
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                {/* <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader> */}
                <CardBody  className="mt-4 pt-lg-4">
                  {/* <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row> */}
                  <div style={{marginTop: '100px'}} className="text-center">
                    <h3>
                    {this.state.data.FirstName}{this.state.data.MiddleName} {this.state.data.LastName}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.data.City} {this.state.data.Country}
                    </div>
                   
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.data.EducationDetails}
                    </div>
                    <hr className="my-4" />
                   
                    {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>

          <Col style={{marginLeft: '550px', marginTop:'-705px'}}  className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card style={{marginRight: '-270px'}} className="card-profile shadow">
              <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb--3">Education </h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="/edudetails"
                        // onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      
                    </div>
                  </Col>
                </Row>
                
                <CardBody style={{background: '#F7FAFC', marginBottom:'50px'}} className="mt-4 pt-lg-4">
                  <div style={{marginTop: '100px'}} className="text-center">
                    <h3>
                    {this.state.data.FirstName}{this.state.data.MiddleName} {this.state.data.LastName}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.data.City} {this.state.data.Country}
                    </div>
                   
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.data.EducationDetails}
                    </div>
                   
                    {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col style={{marginLeft: '550px', marginTop:'-343px'}}  className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card style={{marginRight: '-270px'}} className="card-profile shadow">
              <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb--3">Experience</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="/jobdetails"
                        // onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      
                    </div>
                  </Col>
                </Row>
                
                <CardBody style={{background: '#F7FAFC', marginBottom:'50px'}} className="mt-4 pt-lg-4">
                  <div style={{marginTop: '100px'}} className="text-center">
                    <h3>
                    {this.state.data.FirstName}{this.state.data.MiddleName} {this.state.data.LastName}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.data.City} {this.state.data.Country}
                    </div>
                   
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.data.EducationDetails}
                    </div>
                   
                    {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            
            <Col className="order-xl-1" xl="5">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      {/* <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody >
                <Form  role="form"
                onSubmit={this.handleSubmit}
                style={{
                  padding: "0px 20px",
                  textAlign: "",
                  color: "",}}>
                {this.renderInput("FirstName", "First Name", )}
                {this.renderInput("MiddleName", "Middle Name",)}
                {this.renderInput("LastName", "Last Name",)}
                {this.renderInput("Address", "Address",)}
                {this.renderInput("City", "City",)}
                {this.renderInput("Country", "Country",)}
                {this.renderInput("Pincode", "Pincode",)}
                {this.renderInput("AboutMe", "About me",)}
                <div className="text-center">
                <Button style={{background: '#B965E0', border: 'none'}} 
                className="my-4" color="primary" type="submit">
                  Update
                </Button>
              </div>
                </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div>
        </Container>
      </>
    );
  };
}
  
  export default Profile;
  