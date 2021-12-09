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
      <Col style={{ marginLeft: '500px', marginTop: '100px', }} lg="6" xl="4">
        <Card style={{ marginTop: 'auto', marginRight: '0px', paddingBottom: '20px', paddingTop: '18px', paddingRight: '0px' }} className="card-stats mb-6 mb-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-0"
                >
                  {this.props.title}
                </CardTitle>
                <span style={{ paddingLeft: '40px' }} className="h2 font-weight-bold mb-0">{this.props.count}</span>
              </div>
              <Col className="col">
                <div style={{ marginLeft: '0px' }} className="icon icon-shape bg-warning text-white rounded-circle shadow">
                  <i className="fas fa-chart-pie" />
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