import React from 'react';
import { toast } from 'react-toastify'
import _ from 'lodash'
import Joi from 'joi-browser';
import Forms from 'components/Common/form';
import ESidebar from 'components/Sidebar/eSidebar';
import { registerJobDetails } from 'services/jobService';

import {
  Button,
  Card,
  CardBody,
  Form,
  Row,
  Col,
} from "reactstrap";
import JobCard from './jobCard';
// core components

class JobDetails extends Forms {
  state = {
    data: { companyName: '', Experience: "", Role: '', from_upto: '' },
    employees: [],
    id: [],
    errors: [],
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
      await registerJobDetails(data);
      toast.success("Job details Updated Successful");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/profile";
      }, 2000);
      const { state } = this.props.location;
      //   await getJobDetails();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.company = ex.response.data.data;
        this.setState({ errors });
      }
    }
  }

  //   async componentDidMount() {
  //       const {data:jobExperiences} = await getJobDetails();
  //       let pp = jobExperiences;
  //       console.log(pp);
  //     //   this.setState({ data: this.mapToViewModel(pp) });
  //     //  if(pp===[]){this.doSubmit();}

  //   }

  mapToViewModel(pro) {
    return {
      companyName: pro.companyName,
      Experience: pro.Experience,
      Role: pro.Role,
      from_upto: pro.from_upto,

    };
  }

  render() {
    return (
      <>
        <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
          className=" py-2 py-sm-3 ">
          <ESidebar />
          <Row>
            <Col lg="3" md="7" style={{ marginLeft: "16rem", paddingTop: "px", position: 'absolute', }}>
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form role="form"
                    onSubmit={this.handleSubmit}
                    style={{
                      padding: "auto",
                      textAlign: "",
                      color: "",
                    }}>
                    {this.renderInput("companyName", "Company Name",)}
                    {this.renderInput("Experience", "Years of Experience",)}
                    {this.renderInput("Role", "Designation",)}
                    {this.renderInput("from_upto", "Worked From - To",)}

                    <div className="text-center">
                      <Button style={{ background: '#B965E0', marginTop: 'px', marginLeft: '0px', border: 'none' }}
                        className="" color="primary" type="submit">
                        Update
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <JobCard />


          </Row>
        </div>
      </>
    );
  };
}

export default JobDetails;
