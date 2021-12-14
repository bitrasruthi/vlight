import React from 'react';
import { toast } from 'react-toastify'
import _ from 'lodash'

import paginate from "../Common/paginate";
import Joi from 'joi-browser';
import Forms from 'components/Common/form';
import { updateEduDetails } from 'services/eduService';

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

class EduDetails extends Forms {
  state = {
    data: {  institute: "", passedoutYear: '', percentage: '' },
    employees: [],
    pageSize: 4,
    id: [],
    errors: [],
    currentPage: 1,
    sortColumn: { path: "FirstName", order: "asc" },
    options: [" select", "ssc", "degree", 'pg', 'ug'],
  }

  schema = {
    // qualification: Joi.string(),
    institute: Joi.string().required(),
    passedoutYear: Joi.number().required(),
    percentage: Joi.number().required(),

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
      const qua = this.props.match.params.id

      const data = {...this.state.data, qualification: qua}
      console.log(qua);
      const pp = (data.qualification);
          // console.log(this.props.match.params.id)

      await this.setState({data: {qualification: pp}})
      
      //  if(data === null && data.qualification === ""){
        //    await registerEduDetails(data);
        //  }
        if (pp === []) { this.doSubmit(); }
        else if (pp === 'ssc' || 'degree' || 'ug' || 'pg') {
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
        <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
          className=" py-2 py-sm-3 ">
          <ESidebar />
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
          {/* <div style={{borderRadius: '30px', height: "300px",zIndex: 1001, 
          marginLeft: '450px',marginTop: '50px' ,width: "600px", background: 'white'}}> */}
            <div style={{marginLeft: '450px' }}>
            {/* {/* <h5 style={{fontSize: '20px', paddingTop: '5px'}}>Employee Id: {this.state.employees.EmployeeId}</h5> */}
            <Card className="mx-6 bg-secondary shadow border-0" style={{height: '530px', marginLeft: '200px'}} >
          <CardHeader className="bg-gradient-purple border-0">
            <h3  >Please Add Your Details Below: </h3>
            
          </CardHeader>
        
                <CardBody  className=" px-lg-3 py-sm-2 ">
                  <Form role="form" onSubmit={this.handleSubmit}>
                  {/* {this.renderInput('qualification', 'Qualification', this.state.data.qualification )} */}

                    {/* {this.renderDropdown("qualification", "Qualification", options)} */}
                    {this.renderInput("institute", "Institute",)}
                    {this.renderInput("passedoutYear", "Year of Pass",)}
                    {this.renderInput("percentage", "Percentage",)}

                    <div className="text-center">
                      <Button style={{ background: '#8B65E0', marginTop: '0px', marginLeft: '0px', border: 'none' }}
                        className="" color="primary" type="submit">
                        Update
                      </Button>
                      <Button href='/profile' style={{ background: '#B965E0', marginTop: '0px', marginLeft: '0px', border: 'none' }}
                        className="" color="primary" type="submit">
                        Cancel
                      </Button>
                    </div>
              
                {this.state.showPopup ? <Button style={{ marginLeft: '200px', boxShadow: 'none', background: 'transparent', border: 'none', marginTop: '400px' }}
                href='/leavelist'>
                <i style={{ fontSize: '20px' }} class="far fa-times-circle"></i></Button>
                : null}
                  </Form>
                </CardBody>
                  </Card>
                
            </div>
            
        <div>
      </div>
         </div>
      </div>
      </div>
          
        {/* </div> */}
      </>
    );
  };
}

export default EduDetails;
