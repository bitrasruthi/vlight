import React from 'react';



import {
  Card,
  CardBody,
  CardTitle,

  Row,
  Col,
} from "reactstrap";

class PCard extends React.Component {

  render() {
    return <div>
      <Col style={{ marginLeft: '530px', marginTop: '30px' }} lg="6" xl="4">
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div style={{ textAlign: 'center' }} className="col">
                <CardTitle
                  style={{ textAlign: 'center' }}
                  tag="h5"
                  className="text-uppercase text-muted mb-0"
                >
                  {this.props.title}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">{this.props.hrs}</span>
              </div>

            </Row>
          </CardBody>
        </Card>
      </Col>
    </div>;
  }
}

export default PCard;