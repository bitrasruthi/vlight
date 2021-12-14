import React from 'react';
import { getProDetails } from 'services/profileService';

import { Container, Col, Button } from "reactstrap";


class EduCard extends React.Component {
  state = {
    data: { qualification: '', institute: '', passedoutYear: '', percentage: '', },
    degree: { qualification: '', institute: '', passedoutYear: '', percentage: '', },
    ug: { qualification: '', institute: '', passedoutYear: '', percentage: '', },
    pg: { qualification: '', institute: '', passedoutYear: '', percentage: '', }
  }

  async componentDidMount() {

    const { data: profile } = await getProDetails();
    console.log(profile);
    if (profile.length > 0) {
      let pp = profile[0].EducationalDetails[0];
      let tt = profile[0].EducationalDetails[1];
      let yy = profile[0].EducationalDetails[2];
      let kk = profile[0].EducationalDetails[3];
      
      console.log(tt);
      if (pp) {
        this.setState({
          data: {
            qualification: pp.qualification, institute: pp.institute,
            passedoutYear: pp.passedoutYear, percentage: pp.percentage
          }
        });

      }
       if(tt) {
         console.log(tt);
        this.setState({

          degree: {
            qualification: tt.qualification, institute: tt.institute,
            passedoutYear: tt.passedoutYear, percentage: tt.percentage
          }
        });
      }
       if (yy) {
        this.setState({
          ug: {
            qualification: yy.qualification, institute: yy.institute,
            passedoutYear: yy.passedoutYear, percentage: yy.percentage
          }
        });
      }
       if (kk) {
        // console.log(kk);
        this.setState({
          pg: {
            qualification: kk.qualification, institute: kk.institute,
            passedoutYear: kk.passedoutYear, percentage: kk.percentage
          }
        });
      }
    }
    else {

    }
  }

  handleBack() {
    window.location = '/edashboard'
  }

  render() {
    return (
      <>
        {/* <ESidebar/> */}
        <div style={{ height: '30%', position: "absolute", left: '0', width: '100%', }}
          className=" py-2 py-sm-3 ">



          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>

            <Col lg="6" md="3" style={{ marginLeft: "rem", marginTop: '-600px', paddingTop: "px", position: 'absolute', }}>
              <h3> SSC
              <Button style={{marginTop:'0px', marginLeft: '200px', boxShadow: 'none'}} href="/edudetails/ssc"><i  class="fas fa-edit"></i></Button>
              </h3>
              <p>Institute: {this.state.data.institute}</p>
              <p>Year of Pass: {this.state.data.passedoutYear}</p>
              <p>Percentage: {this.state.data.percentage}</p>
            </Col>
            <Col lg="6" md="3" style={{ marginLeft: "22rem", marginTop: '-600px', paddingTop: "px", position: 'absolute', }}>
              <h3 > Intermediate
              <Button style={{marginTop:'-50px', marginLeft: '200px', boxShadow: 'none'}} href="/edudetails/degree"><i  class="fas fa-edit"></i></Button>
              </h3>
              <p>Institute: {this.state.degree.institute}</p>
              <p>Year of Pass: {this.state.degree.passedoutYear}</p>
              <p>Percentage: {this.state.degree.percentage}</p>

            </Col>
            <Col lg="6" md="3" style={{ marginLeft: "rem", marginTop: '-200px', paddingTop: "px", position: 'absolute', }}>
              <h3 > Graduation
              <Button style={{marginTop:'-50px', marginLeft: '230px', boxShadow: 'none'}} href="/edudetails/ug"><i  class="fas fa-edit"></i></Button>
              </h3>
              <p>Institute: {this.state.ug.institute}</p>
              <p>Year of Pass: {this.state.ug.passedoutYear}</p>
              <p>Percentage: {this.state.ug.percentage}</p>

            </Col>
            <Col lg="6" md="3" style={{ marginLeft: "22rem", marginTop: '-200px', paddingTop: "px", position: 'absolute', }}>

              <h3 > Post Graduation
              <Button style={{marginTop:'-50px', marginLeft: '200px', boxShadow: 'none'}} href="/edudetails/pg"><i  class="fas fa-edit"></i></Button>

              </h3>
              <p>Institute: {this.state.pg.institute}</p>
              <p>Year of Pass: {this.state.pg.passedoutYear}</p>
              <p>Percentage: {this.state.pg.percentage}</p>

            </Col>

          </Container>

        </div>
      </>
    );
  };
}

export default EduCard;
