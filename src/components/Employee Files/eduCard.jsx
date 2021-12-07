import ESidebar from 'components/Sidebar/eSidebar';
import React from 'react';
import { getProDetails } from 'services/profileService';

import { Button, Container, Row, Col } from "reactstrap";


class EduCard extends React.Component {
  state={
    data: {qualification: '', institute: '', passedoutYear: '', percentage:'', },
    degree: {qualification: '', institute: '', passedoutYear: '', percentage:'', },
    ug: {qualification: '', institute: '', passedoutYear: '', percentage:'', },
    pg: {qualification: '', institute: '', passedoutYear: '', percentage:'', }
}

  async componentDidMount() {
    
    const {data:profile} = await getProDetails();
    if(profile.length>0){
    let pp = profile[0].EducationalDetails[0];
    let tt = profile[0].EducationalDetails[1];
    let yy = profile[0].EducationalDetails[2];
    let kk = profile[0].EducationalDetails[3];
   console.log(kk);
 
   this.setState({data: {qualification:pp.qualification, institute:pp.institute, 
    passedoutYear:pp.passedoutYear, percentage: pp.percentage } });
    this.setState({degree: {qualification:tt.qualification, institute:tt.institute, 
    passedoutYear:tt.passedoutYear, percentage: tt.percentage } });
    this.setState({ug: {qualification:yy.qualification, institute:yy.institute, 
    passedoutYear:yy.passedoutYear, percentage: yy.percentage } });
    this.setState({pg: {qualification:kk.qualification, institute:kk.institute, 
    passedoutYear:kk.passedoutYear, percentage: kk.percentage } });     
    }
    else {
      
    }
    }

handleBack(){
  window.location = '/edashboard'
} 

  render() { 
     return (
    <>
    {/* <ESidebar/> */}
    <div style = {{height: '30%', position: "absolute", left: '0', width: '100%', }} 
      className=" py-2 py-sm-3 ">
      
       

        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>

            <Col lg="6" md="3" style={{marginLeft:"3rem", marginTop: '-600px' ,paddingTop: "px", position: 'absolute', }}>
              {/* <h3 style={{textAlign: 'center'}} className="display-2 text-black">{this.state.data.qualification}</h3>
              <p   className="text-black mt-0 mb-5">
                {this.state.data.institute}
              </p> */}
              <h3> SSC</h3>
              <p>Institute: {this.state.data.institute}</p>
              <p>Year of Pass: {this.state.data.passedoutYear}</p>
              <p>Percentage: {this.state.data.percentage}</p>

            </Col>
            <Col lg="6" md="3" style={{marginLeft:"22rem", marginTop: '-600px' ,paddingTop: "px", position: 'absolute', }}>
              {/* <h3 style={{textAlign: 'center'}} className="display-2 text-black">{this.state.data.qualification}</h3>
              <p   className="text-black mt-0 mb-5">
                {this.state.data.institute}
              </p> */}
              <h3 > Intermediate</h3>
              <p>Institute: {this.state.degree.institute}</p>
              <p>Year of Pass: {this.state.degree.passedoutYear}</p>
              <p>Percentage: {this.state.degree.percentage}</p>

            </Col>
            <Col lg="6" md="3" style={{marginLeft:"3rem", marginTop: '-200px' ,paddingTop: "px", position: 'absolute', }}>
              {/* <h3 style={{textAlign: 'center'}} className="display-2 text-black">{this.state.data.qualification}</h3>
              <p   className="text-black mt-0 mb-5">
                {this.state.data.institute}
              </p> */}
              <h3 > Graduation</h3>
              <p>Institute: {this.state.ug.institute}</p>
              <p>Year of Pass: {this.state.ug.passedoutYear}</p>
              <p>Percentage: {this.state.ug.percentage}</p>

            </Col>
            <Col lg="6" md="3" style={{marginLeft:"22rem", marginTop: '-200px' ,paddingTop: "px", position: 'absolute', }}>
              {/* <h3 style={{textAlign: 'center'}} className="display-2 text-black">{this.state.data.qualification}</h3>
              <p   className="text-black mt-0 mb-5">
                {this.state.data.institute}
              </p> */}
              <h3 > Post Graduation</h3>
              <p>Institute: {this.state.ug.institute}</p>
              <p>Year of Pass: {this.state.ug.passedoutYear}</p>
              <p>Percentage: {this.state.ug.percentage}</p>

            </Col>
           
        </Container>
            
      </div>
    </>
  );
};
}

export default EduCard;
