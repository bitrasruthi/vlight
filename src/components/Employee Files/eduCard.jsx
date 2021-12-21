import React from 'react';
import { getProDetails } from 'services/profileService';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { Container, Col, Button,  } from "reactstrap";
import EduDetails from './eduDetails';
import EduDetailsDegree from './eduDetailsDegree';
import EduDetailsUg from './empDetailsUg';
import EduDetailsPg from './empDetailsPg';
import { updateEduDetails } from 'services/eduService';
import { registerEduDetails } from 'services/eduService';
import { toast } from "react-toastify";




class EduCard extends React.Component {
  state = {
    openModal: null,
    data: { qualification: '', institute: '', passedoutYear: '', percentage: '',},
    degree: { qualification: '', institute: '', passedoutYear: '', percentage: '', },
    ug: { qualification: '', institute: '', passedoutYear: '', percentage: '', },
    pg: { qualification: '', institute: '', passedoutYear: '', percentage: '', },
    edu: ['ssc', 'degree', 'ug', 'pg']
  }

  onClickButton = e =>{
    // e.preventDefault()
    this.setState({openModal : e})

}


  onCloseModal = ()=>{
    this.setState({openModal : false})
}

  async componentDidMount() {
    const { data: profile } = await getProDetails();
    console.log(profile[0].EducationalDetails);
    if (profile.length > 0) {
      let pp = profile[0].EducationalDetails[0];
      let tt = profile[0].EducationalDetails[1];
      let yy = profile[0].EducationalDetails[2];
      let kk = profile[0].EducationalDetails[3];
      

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

            <Col lg="6" md="3" style={{ marginLeft: "5rem", marginTop: '-600px', paddingTop: "px", position: 'absolute', }}>
              <h3> SSC
              {/* <Button style={{marginTop:'0px', marginLeft: '200px', boxShadow: 'none'}} 
              onClick={()=> this.onClickButton (emp)}>
                <i  class="fas fa-edit"/></i></Button> */}
                <Button  style={{marginTop:'0px', marginLeft: '345px', boxShadow: 'none', background: '#B965E0'}} onClick={()=>{this.onClickButton("ssc")}}>
          <Link style={{ color: 'white', zIndex: 1001 }} to="/profile/ssc"> <i  class="fas fa-edit"/>
          </Link></Button> 

              </h3>
              <p>Institute: {this.state.data.institute}</p>
              <p>Year of Pass: {this.state.data.passedoutYear}</p>
              <p>Percentage: {this.state.data.percentage}</p>
            </Col>
            <Col lg="6" md="3" style={{ marginLeft: "40rem", marginTop: '-600px', paddingTop: "px", position: 'absolute', }}>
              <h3 > Intermediate
              <Button  style={{marginTop:'0px', marginLeft: '300px', boxShadow: 'none', background: '#B965E0'}} onClick={()=>{this.onClickButton("degree")}}>
          <Link style={{ color: 'white', zIndex: 1001 }} to="/profile/degree"> <i  class="fas fa-edit"/>
          </Link></Button> 

              </h3>
              <p>Institute: {this.state.degree.institute}</p>
              <p>Year of Pass: {this.state.degree.passedoutYear}</p>
              <p>Percentage: {this.state.degree.percentage}</p>

            </Col>
            <Col lg="6" md="3" style={{ marginLeft: "5rem", marginTop: '-200px', paddingTop: "px", position: 'absolute', }}>
              <h3 > Graduation
              <Button  style={{marginTop:'0px', marginLeft: '280px', boxShadow: 'none', background: '#B965E0'}} onClick={()=>{this.onClickButton("ug")}}>
          <Link style={{ color: 'white', zIndex: 1001 }} to="/profile/ug"> <i  class="fas fa-edit"/>
          </Link></Button> 
              </h3>
              <p>Institute: {this.state.ug.institute}</p>
              <p>Year of Pass: {this.state.ug.passedoutYear}</p>
              <p>Percentage: {this.state.ug.percentage}</p>

            </Col>
            <Col lg="6" md="3" style={{ marginLeft: "40rem", marginTop: '-200px', paddingTop: "px", position: 'absolute', }}>

              <h3 > Post Graduation
              <Button style={{marginTop:'0px', marginLeft: '280px', boxShadow: 'none', background: '#B965E0'}} onClick={()=>{this.onClickButton("pg")}}>
          <Link style={{ color: 'white', zIndex: 1001 }} to="/profile/pg"> <i  class="fas fa-edit"/>
          </Link></Button> 

              </h3>
              <p>Institute: {this.state.pg.institute}</p>
              <p>Year of Pass: {this.state.pg.passedoutYear}</p>
              <p>Percentage: {this.state.pg.percentage}</p>

            </Col>
          </Container>

        </div>

      
        <Modal open={this.state.openModal === 'ssc'} onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetails />
        </Modal>
        <Modal open={this.state.openModal === 'degree' }  onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetailsDegree/>
        </Modal>
        <Modal open={this.state.openModal === 'ug' }  onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetailsUg/>
        </Modal>
        <Modal open={this.state.openModal === 'pg' }  onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetailsPg/>
        </Modal>
        {/* <Modal open={this.state.openModal} onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetailsUg
          ug={'ug'}/>
        </Modal>
        <Modal open={this.state.openModal} onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetailsPg
          pg={'pg'}/>
        </Modal> */}
        
      </>
    );
  };
}

export default EduCard;
