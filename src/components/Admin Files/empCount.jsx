import React from 'react';
import EmpWorkingStas from './empWorkingStats';
import get_employeelist from 'reduxstore/actions/employeeAction';
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

class ECard extends EmpWorkingStas {

    render() { 
        return <div>
             <Col style={{marginLeft: '700px', marginTop: 'auto', marginBottom: '100px'}}lg="6" xl="4">
                <Card style={{marginTop: '-120px', paddingBottom: '20px', paddingTop: '18px', paddingRight: '-30px'}} className="card-stats mb-6 mb-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Employees
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{this.props.count}</span>
                      </div>
                      <Col className="col-auto">
                        <div  className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i style={{paddingLeft: '-30px'}} className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
        </div>;
    }
}
 
export default ECard;