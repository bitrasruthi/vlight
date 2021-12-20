import React from 'react';
import { getProDetails } from 'services/profileService';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { Container, Col, Button,  } from "reactstrap";
import EduDetails from './eduDetails';
import EduDetailsDegree from './eduDetailsDegree';
import EduDetailsUg from './empDetailsUg';
import EduDetailsPg from './empDetailsPg';



class EduCard extends React.Component {
  state = {
    openModal: false,
    data: { qualification: '', institute: '', passedoutYear: '', percentage: '', },

  }

  onClickButton = e =>{
    // e.preventDefault()
    this.setState({openModal : true})
    console.log(e);
}

  onCloseModal = ()=>{
    this.setState({openModal : false})
}


  async componentDidMount() {
    const { data: profile } = await getProDetails();
    console.log(profile);
    if (profile.length > 0) {
      let pp = profile[0].EducationalDetails[0];
 
      if (pp) {
        this.setState({
          data: {
            qualification: pp.qualification, institute: pp.institute,
            passedoutYear: pp.passedoutYear, percentage: pp.percentage
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
              <h3> Degree
              {/* <Button style={{marginTop:'0px', marginLeft: '200px', boxShadow: 'none'}} 
              onClick={()=> this.onClickButton (emp)}>
                <i  class="fas fa-edit"/></i></Button> */}
                <Button style={{marginTop:'0px', marginLeft: '200px', boxShadow: 'none'}} onClick={this.onClickButton}>
          <Link style={{ color: 'black', zIndex: 1001 }} to="/profile/degree"> <i  class="fas fa-edit"/>
          </Link></Button> 

              </h3>
              <p>Institute: {this.state.data.institute}</p>
              <p>Year of Pass: {this.state.data.passedoutYear}</p>
              <p>Percentage: {this.state.data.percentage}</p>
            </Col>


          </Container>

        </div>
        <Modal open={this.state.openModal} onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetailsDegree/>
        </Modal>
        {/* <Modal open={this.state.openModal} onClose={(edu) =>{this.onCloseModal(edu)}}>
          <EduDetailsDegree/>
        </Modal> */}
        {/* <Modal open={this.state.openModal} onClose={(edu) =>{this.onCloseModal3(edu)}}>
          <EduDetailsUg/>
        </Modal>
        <Modal open={this.state.openModal} onClose={(edu) =>{this.onCloseModal4(edu)}}>
          <EduDetailsPg/>
        </Modal> */}
        
      </>
    );
  };
}

export default EduCard;
