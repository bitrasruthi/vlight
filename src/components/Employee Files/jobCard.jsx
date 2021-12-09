import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,

  Row,
  Col,
} from "reactstrap";

class JobCard extends React.Component {
  state = { data: { companyName: '', Experience: '', Role: '', from_upto: '' } }

  render() {
    return <div>
      <Col style={{ marginLeft: '600px', marginTop: 'auto' }} className="order-xl-2 mb-5 mb-xl-0" xl="4">
        <Card style={{ marginRight: '-270px' }} className="card-profile shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb--3">Experience</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="/jobdetails"
                  // onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Update
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">

              </div>
            </Col>
          </Row>

          <CardBody style={{ background: '#F7FAFC', marginBottom: '50px' }} className="mt-4 pt-lg-4">
            <div style={{ marginTop: '100px' }} className="text-center">
              <h3>
                {this.state.data.companyName}
                {/* <span className="font-weight-light">, 27</span> */}
              </h3>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
              </div>

              <div>
                <i className="ni education_hat mr-2" />
                {this.state.data.EducationDetails}
              </div>

              {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a> */}
            </div>
          </CardBody>
        </Card>
      </Col>
    </div>;
  }
}

export default JobCard;