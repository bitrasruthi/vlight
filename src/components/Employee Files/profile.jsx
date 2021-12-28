import React from 'react';
import { toast } from 'react-toastify'
import _ from 'lodash'
import UserHeader from "components/Headers/UserHeader.js";
import { getProDetails } from '../../services/profileService';
import { profileRegister } from '../../services/profileService';
import paginate from "../Common/paginate";
import Joi from 'joi-browser';
import Forms from 'components/Common/form';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
import EduCard from './eduCard';
// core components

class Profile extends Forms {
  state = {
    data: {
      FirstName: '', MiddleName: '', LastName: '', Address: '', City: '',
      Country: '', Pincode: '', AboutMe: '', role: '', fatherName: '', motherName: '',
      emergencyNumber: '', emergencyAddress: '',
    },
    employees: [],
    pageSize: 4,
    id: [],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "FirstName", order: "asc" },
  }

  schema = {
    FirstName: Joi.string().min(3).required(),
    MiddleName: Joi.string(),
    LastName: Joi.string().min(3).required(),
    fatherName: Joi.string().min(3).required(),
    motherName: Joi.string().min(3).required(),
    emergencyNumber: Joi.number().min(10).required(),
    Address: Joi.string().min(3).required(),
    City: Joi.string().min(3).required(),
    Country: Joi.string().min(3).required(),
    Pincode: Joi.number().min(6).required(),
    emergencyAddress: Joi.string().min(3).required(),
    AboutMe: Joi.string().min(3).required(),
    // last_updated_on: Joi.string().required(),

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


  async componentDidMount() {
    // this.doSubmit();
    // const tt = getEmployees();
    // console.log(tt);

    const { data: profile } = await getProDetails();
    let pp = profile[0].profile;
    console.log(pp);
    this.setState({ data: this.mapToViewModel(pp) });
    if (pp === []) { this.doSubmit(); }

  }

  mapToViewModel(pro) {
    return {
      FirstName: pro.FirstName,
      MiddleName: pro.MiddleName,
      LastName: pro.LastName,
      Country: pro.Country,
      City: pro.City,
      Address: pro.Address,
      Pincode: pro.Pincode,
      AboutMe: pro.AboutMe,
      fatherName: pro.fatherName,
      motherName: pro.motherName,
      emergencyAddress: pro.emergencyAddress,
      emergencyNumber: pro.emergencyNumber,
      // last_updated_on: pro.last_updated_on,
    };
  }

  render() {
    return (
      <>

        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
            className=" py-4 py-sm-3 ">
            <Row style={{ marginTop: '220px', marginLeft: '3rem' }}>
              <Col style={{marginLeft: '910px',  marginTop: '-px',  position: 'absolute'}} className="order-xl-2 mb-5 mb-xl-0" xl="1">
                <Card style={{ marginRight: '-270px', marginLeft: '50px', paddingBottom: '418px',  }} className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img style={{marginLeft: '0px'}}
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


                  <CardBody className="mt-4 pt-lg-4">

                    <div style={{ marginTop: '100px' }} className="text-center">
                      <h3 style={{ textTransform: 'uppercase' }}>
                        {this.state.data.FirstName} {this.state.data.MiddleName} {this.state.data.LastName}
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

              <Col style={{ marginLeft: '-40px', marginTop: '555px',  paddingRight: '-300px', position: 'absolute' }} className="order-xl-2 mb--6 mb-xl-0" xl="9">
                <Card style={{ marginRight: '-320px', marginTop: '150px', }} className="card-profile shadow">
                  <CardHeader style={{textAlign: 'center'}} className="bg-white border-0">
                    <h2 className="">Education Details</h2>
                    {/* conflicts test  */}
                    {/* <Col className="text-right" xs="4">
                        {/* <Button
                          color="primary"
                          href="/edudetails"
                          // onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Update
                        </Button> */}
                    {/* </Col> */}
                  </CardHeader>
                  <CardBody style={{ background: '#F7FAFC', marginBottom: '0px', }} className="mt pt-lg-7">
                    <p style={{ marginBottom: '300px' }}></p>
                    <EduCard />
                  </CardBody>
                </Card>
              </Col>


              <Col style={{marginLeft: '-40px', position: 'absolute',}} className="order-xl-1" xl="9">
                <Card  className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">My Account</h3>
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
                  <CardBody  >
                    <Form role="form"
                      onSubmit={this.handleSubmit}
                      style={{
                        padding: "0px 20px",
                        textAlign: "",
                        color: "",
                      }}>
                    <Col sm={{ size: 4 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                      {this.renderInput("FirstName", "First Name",)}
                      </Col>
                      <Col sm={{ size: 4 }} style={{marginLeft: '285px', marginTop: '-100px'}}className='mr-sm-2'>
                      {this.renderInput("MiddleName", "Middle Name",)}
                      </Col>
                      <Col sm={{ size: 4 }} style={{marginLeft: '570px', marginTop: '-100px'}}className='mr-sm-2'>
                      {this.renderInput("LastName", "Last Name",)}
                      </Col>
                      <Col sm={{ size: 6 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                      {this.renderInput("Address", "Address",)}
                      </Col>
                      <Col sm={{ size: 6 }} style={{marginLeft: '430px', marginTop: '-100px'}}className='mr-sm-2'>
                      {this.renderInput("emergencyAddress", "Emergency Address",)}
                      </Col>
                      <Col sm={{ size: 4 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                      
                      {this.renderInput("City", "City",)}
                      </Col>

                      <Col sm={{ size: 4 }} style={{marginLeft: '285px', marginTop: '-100px'}}className='mr-sm-2'>
                      {this.renderInput("Country", "Country",)}
                      </Col>
                      <Col sm={{ size: 4 }} style={{marginLeft: '570px', marginTop: '-100px'}}className='mr-sm-2'>
                      {this.renderInput("Pincode", "Pincode",)}
                      </Col>
                      <Col sm={{ size: 12 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                      {this.renderInput("AboutMe", "About me",)}
                      </Col>
                      <Col sm={{ size: 4 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                      {this.renderInput("fatherName", "Father Name",)}
                      </Col>
                      <Col sm={{ size: 4 }} style={{marginLeft: '285px', marginTop: '-100px'}}className='mr-sm-2'>
                      {this.renderInput("motherName", "Mother Name",)}
                      </Col>
                      <Col sm={{ size: 4 }} style={{marginLeft: '570px', marginTop: '-100px'}}className='mr-sm-2'>
                      {this.renderInput("emergencyNumber", "Emergency Number",)}
                      </Col>
                      {/* {this.renderInput("last_updated_on", "Last Updated On",)} */}
                      <div className="text-center">
                        <Button style={{ background: '#B965E0', border: 'none' }}
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
