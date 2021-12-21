import React from 'react';
import EmpWorkingStas from './empWorkingStats';
import {
  Card,
  CardBody,
  CardTitle,
  Container,

  Row,
  Col,
} from "reactstrap";

class ECard extends React.Component {

  render() {
    return <>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row style={{marginTop: '250px'}}>
            <Col style={{marginLeft: '155px', marginTop: '-168px',  }} lg="6" xl="3">
                <Card style={{marginRight: '-50px',}} className="card-stats mb-4 mb-xl-0">
                  <CardBody style={{marginBottom: 'px'}}>
                    <Row style={{paddingTop: '50px', paddingBottom: '0px'}}>
                      <div className="col">
                        <CardTitle
                         style={{marginTop: '-50px', marginRight: '0px', paddingTop: '10px', marginLeft: '20px' }}
                          tag="h3"
                          className="text-uppercase mb-0"
                        >
                          TOTAL EMPLOYEES
                          <Col style={{marginLeft: '160px', marginTop:"-34px"}} className="col-auto">
                        <div  className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                        </CardTitle>
                      </div>
                      <Col>
                        <h4 style={{marginLeft: '-30px', textAlign: 'center', marginRight: '0px', marginTop: '20px'}} className="h1 font-weight-bold mb-3">
                        {this.props.count}
                        </h4>
                        </Col>
                      
                    </Row>
                    <p style={{paddingTop: '0px'}} className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span style={{marginLeft: '80px'}} className="text-nowrap">Since last month</span>
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col style={{marginLeft: '477px', marginTop: '-198px',  }} lg="6" xl="3">
                <Card style={{marginRight: '-50px',}} className="card-stats mb-4 mb-xl-0">
                  <CardBody style={{marginBottom: 'px'}}>
                    <Row style={{paddingTop: '50px', paddingBottom: '0px'}}>
                      <div className="col">
                        <CardTitle
                         style={{marginTop: '-50px', marginRight: '0px', paddingTop: '10px', marginLeft: '0px' }}
                          tag="h3"
                          className="text-uppercase mb-0"
                        >
                          PRODUCTION HOURS
                          <Col style={{marginLeft: '180px', marginTop:"-34px"}} className="col-auto">
                        <div  className="icon icon-shape bg-orange text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                        </CardTitle>
                      </div>
                      <Col>
                        <h4 style={{marginLeft: '-0px', textAlign: 'center', marginRight: '0px', marginTop: '20px'}} className="h1 font-weight-bold mb-3">
                        {this.props.totalmonthhours}
                        </h4>
                        </Col>
                      
                    </Row>
                    <p style={{paddingTop: '0px'}} className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> AVG
                      </span>{" "}
                      <span style={{marginLeft: '80px'}} className="text-nowrap">Since last month</span>
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col style={{marginLeft: '800px', marginTop: '-198px',  }} lg="6" xl="3">
                <Card style={{marginRight: '-50px',}} className="card-stats mb-4 mb-xl-0">
                  <CardBody style={{marginBottom: 'px'}}>
                    <Row style={{paddingTop: '50px', paddingBottom: '0px'}}>
                      <div className="col">
                        <CardTitle
                         style={{marginTop: '-50px', marginRight: '0px', paddingTop: '10px', marginLeft: '0px' }}
                          tag="h3"
                          className="text-uppercase mb-0"
                        >
                          PRODUCTION HOURS
                          <Col style={{marginLeft: '180px', marginTop:"-34px"}} className="col-auto">
                        <div  className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                        </CardTitle>
                      </div>
                      <Col>
                        <h4 style={{marginLeft: '-0px', textAlign: 'center', marginRight: '0px', marginTop: '20px'}} className="h1 font-weight-bold mb-3">
                        {this.props.totalweekhours}
                        </h4>
                        </Col>
                      
                    </Row>
                    <p style={{paddingTop: '0px'}} className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> AVG
                      </span>{" "}
                      <span style={{marginLeft: '80px'}} className="text-nowrap">Since last week</span>
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
      </Row>
      </div>
      </Container>
    </>
    
  }
}

export default ECard;