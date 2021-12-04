import ESidebar from 'components/Sidebar/eSidebar';
import React from 'react';
import { getProDetails } from 'services/profileService';

import { Button, Container, Row, Col } from "reactstrap";


class UserHeader extends React.Component {
  state={
    data: {FirstName: '', MiddleName: '', LastName: '', Address:'', City: '', 
    Country: '', Pincode:'', AboutMe: '', EducationDetails:{}},}

  async componentDidMount() {
    
    const {data:profile} = await getProDetails();
    let pp = profile[0].profile;
   console.log(pp);
 
  this.setState({ data: {FirstName:pp.FirstName, AboutMe:pp.AboutMe } });
}

handleBack(){
  window.location = '/edashboard'
} 

  render() { 
     return (
    <>
    {/* <ESidebar/> */}
      <div className="header pb-5 pt-5 pt-lg-5 d-flex align-items-center"
        // style={{
          //   minHeight: "600px",
        //   backgroundImage:
        //     "url(" +
        //     require("../../assets/img/theme/profile-cover.jpg").default +
        //     ")",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center top",
        // }}
      >
         <Button onClick={this.handleBack} style={{marginTop: '-200px',background:'transparent', border: 'none', boxShadow: 'none',
         marginLeft: '5px', fontSize: '50px', zIndex: '1001', color: 'white'}} > 
         <i  class="fas fa-chevron-circle-left"></i> </Button>


        {/* Mask */}
        <span className="mask bg-gradient-purple opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>

            <Col style={{marginRight: '-140px'}} lg="9" md="10">
              <h1  className="display-2 text-white">Hello {this.state.data.FirstName}</h1>
              <p   className="text-white mt-0 mb-5">
                {this.state.data.AboutMe}
              </p>
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
            </Col>
         
        </Container>
      </div>
    </>
  );
};
}

export default UserHeader;
