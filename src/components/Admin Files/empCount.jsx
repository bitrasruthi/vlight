import React from 'react';
import EmpWorkingStas from './empWorkingStats';
import {
  Card,
  CardBody,
  CardTitle,

  Row,
  Col,
} from "reactstrap";

class ECard extends React.Component {

  render() {
    return <div>
      {/* <Col style={{ marginLeft: '500px', marginTop: '100px', }} lg="2" xl="4">
        <Card style={{ marginTop: 'auto', marginRight: '0px', paddingBottom: '20px', paddingTop: '18px', paddingRight: '0px' }} className="card-stats mb-6 mb-0">
         */}
              <Col style={{marginLeft: '250px', marginTop: '130px'}} lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Employees
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {this.props.count}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col style={{marginLeft: '520px', marginTop: '-124px'}} lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Hours
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {this.props.totalmonthhours}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-orange text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Last Month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col style={{marginLeft: '790px', marginTop: '-122px'}} lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Hours
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {this.props.totalweekhours}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" />
                      </span>{" "}
                      <span className="text-nowrap">Last Week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> 3.48%
              </span>{" "}
              <span className="text-nowrap">Since last month</span>
            </p>
          </CardBody>
        </Card>
      </Col>
      {/* <Row>
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
            </Row> */}
      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}

    </div>;
  }
}

export default ECard;