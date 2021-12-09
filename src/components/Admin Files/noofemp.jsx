import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class NoOfEmp extends React.Component {
  render() {
    return <div>
      <Col style={{ marginLeft: '600px', marginTop: '-123px' }} lg="6" xl="3">
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-0"
                >
                  New users
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">2,356</span>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                  <i className="fas fa-chart-pie" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-danger mr-2">
                <i className="fas fa-arrow-down" /> 3.48%
              </span>{" "}
              <span className="text-nowrap">Since last week</span>
            </p>
          </CardBody>
        </Card>
      </Col>
    </div>;
  }
}

export default NoOfEmp;