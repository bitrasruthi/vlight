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
import { calProdHours } from 'services/prodService';
import { getCal } from 'services/prodService';

class EmpWorkingStas extends Forms {
    state = {
        data: {
          EmployeeId: "",
         from_Date: '',
         to_Date: '',
        },
        errors: [],
        pHours: '',
      };
    
      schema = {
        EmployeeId: Joi.string().required(),
        from_Date: Joi.string().required(),
        to_Date: Joi.string().required(),
      };


      doSubmit = async () => {
        try {
          const { data:prod, pHours} = this.state;
          const pp = await calProdHours(prod);
          const ss = pp.data.data;
          toast.info(`${ss}`);
            // return ss;
           
        await this.setState({pHours: ss})
        console.log(this.state.pHours);
        //   setTimeout(() => {
        //     window.location = state ? state.from.pathname : "/dashboard";
        //   }, 2000);
          const { state } = this.props.location;
        //   await get_employeelist();
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.EmployeeName = ex.response.data.data;
            this.setState({ errors });
          }
        }
    
        // this.props.history.push("/admin/addemployee");
      };
    
    render() { 
        return <div  style = {{height: '', position: "absolute", left: '0', width: '100%',}} 
        className="header bg-gradient-success py-5 py-sm-1 ">
            <Sidebar/>
            <Col lg="5" md="7" style={{marginLeft:"35%", paddingTop: "180px", position: 'absolute'}}>
        <Card className="bg-secondary shadow border-0" >
          <CardBody className="px-lg-3 py-sm-5">
            <Form role="form" onSubmit={this.handleSubmit}>
                  
                  {this.renderInput("EmployeeId", "Employee ID")}
                  {this.renderInput("from_Date", "From Date", "date")}
                  {this.renderInput("to_Date", "To Date", 'date')}
                
              <div className="text-center">
                <Button style={{background: '#2DCECB', border: 'none'}} className="my-4" color="primary" type="submit">
                  Get Production Hours
                </Button>
              </div>
            </Form>
            </CardBody>
            </Card>
            </Col> 
            <Col style={{marginLeft: '530px', marginTop: '30px'}}lg="6" xl="4">
                <Card  className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div style={{textAlign: 'center'}} className="col">
                        <CardTitle
                        style={{textAlign: 'center'}}
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Production Hours
                        </CardTitle>
                            <div>
                        <span className="h2 font-weight-bold mb-0">{this.state.pHours}</span>
                        </div>
                      </div>
                      
                    </Row>
                  </CardBody>
                </Card>
              </Col>
                   </div>;
    }
}
 
export default EmpWorkingStas;