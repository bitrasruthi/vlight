import React from 'react';
import { toast } from 'react-toastify'
import _ from 'lodash'

import paginate from "../Common/paginate";
import Joi from 'joi-browser';
import Forms from 'components/Common/form';
import { updateEduDetails } from 'services/eduService';
import { registerEduDetails } from 'services/eduService';

import {
  Button,
  CardHeader,
  Card,
  CardBody,
  Form,
  Row,
  Col,
} from "reactstrap";
import ESidebar from 'components/Sidebar/eSidebar';
import EduCard from './eduCard';
// core components

class EduDetailsDegree extends Forms {
  state = {
    data: {  institute: "", passedoutYear: '', percentage: '' },
    employees: [],
    pageSize: 4,
    id: [],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "FirstName", order: "asc" },
  }

  schema = {
    // qualification: Joi.string(),
    institute: Joi.string().required(),
    passedoutYear: Joi.number().required(),
    percentage: Joi.number().required(),

  };


  componentDidMount() {
    console.log(this.props);
    const data = {...this.state.data, qualification: 'degree'}
    console.log(data.qualification);
  }
  

  doSubmit = async () => {
    try {
      // const qua = this.props.match.params.id

      const data = {...this.state.data, qualification: 'degree'}
      console.log(data);
      const pp = (data.institute);
          // console.log(this.props.match.params.id)

      await this.setState({data: {qualification: pp}})
      
      //  if(data === null && data.qualification === ""){
        //    await registerEduDetails(data);
        //  }
        if (pp === []) {  await registerEduDetails(data.institute, data.passedoutYear, data.percentage) }
        else if (pp.qualification === 'degree' || 'ug' || 'pg') {
          await updateEduDetails(data)
      }
      //  const tt = await this.setState({data: pp.data});
      //   console.log(tt);


      // //   console.log(tt);
      toast.success("Education details Updated Successfully");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/profile";
      }, 2000);
      const { state } = this.props.location;

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.institute = ex.response.data;
        this.setState({ errors });
      }
    }
  }


  render() {
    const { options } = this.state
    return (
      <>
      <div style={{marginTop: '0px', height:'430px', width:'420px',marginRight: "-0px" }}  >
        <Col lg="9" md="9" style={{ marginLeft: '30px',
        height:'400px', width:'650px',marginRight: "-0px", paddingTop: "auto", position: 'absolute',marginTop: '20px', }}>
        <Card className="bg-secondary shadow border-0" >
          <CardHeader className="bg-gradient-purple border-0">
            <Col style={{ marginLeft: '60px', paddingBottom: '10px' }} xs="9">
              <h3 className="mb--3">Leave Action</h3>
            </Col>
          </CardHeader>
          <CardBody style={{textAlign: 'center'}} className="px-lg-3 py-sm-5">
          <Form role="form" onSubmit={this.doSubmit}>
                  {/* {this.renderInput('qualification', 'Qualification', this.state.data.qualification )} */}

                    {/* {this.renderDropdown("qualification", "Qualification", options)} */}
                    {this.renderInput("institute", "Institute",)}
                    <Col sm={{ size: 6 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                    {this.renderInput("passedoutYear", "Year of Pass",)}
                    </Col>
                    <Col sm={{ size: 6 }} style={{marginLeft: '150px', marginTop: '-100px'}}className='mr-sm-2'>
                    {this.renderInput("percentage", "Percentage",)}
                    </Col>

                    <div className="text-center">
                      <Button style={{ background: '#8B65E0', marginTop: '0px', marginLeft: '0px', border: 'none', zIndex: 1001 }}
                        className=""  color="primary" type="submit" onClick={this.doSubmit}>
                        Update
                      </Button>
                     
                    </div>
              
                  </Form>
              </CardBody>
          </Card>
          </Col>
              </div>
        <div>
      </div>
       
          
        {/* </div> */}
      </>
    );
  };
}

export default EduDetailsDegree;
