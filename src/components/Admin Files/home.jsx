import React from 'react';
import { Button, Card, CardBody, CardHeader, Col } from 'reactstrap';


class Home extends React.Component {
    render() { 
        return <div >
  <div style = {{height: '100%', position: "absolute", left: '0', width: '100%',overflow: 'hidden'}} className="header bg-gradient-success py-7 py-lg-3 ">
            <div style={{marginLeft: '400px'}}>
            <Card className="mx-6 bg-secondary shadow border-0" style={{
                marginTop: '150px',height: '230px', width:'400px',marginLeft: '200px'}} >
          {/* <CardHeader className="bg-white border-0">
            <h3 style={{textAlign: 'center'}} >Please select one</h3>
          </CardHeader> */}
                <CardBody style={{textAlign: 'center', marginTop:'30px'}} className=" px-lg-3 py-sm-2 ">
                 <Button style={{height: '50px',  border:'none', }} className="bg-gradient-success" href='/dashboard'>Dashboard
                 <i class="fas fa-tachometer-alt"></i>
                 </Button><br />
                 <Button style={{marginTop: '30px',height: '70px',  border:'none', }} className="bg-gradient-success" href='/register'>
                     Add New <br /> Organization
                 <i class="fas fa-building"></i>
                                  </Button>
                                  
                </CardBody>
                  </Card>
                  <Button style={{marginTop: '30px',height: '40px', borderRadius: '10%', border:'none', marginLeft: '400px'}} className="bg-gradient-danger" href='/logout'>
                    Logout   
                    <i class="fas fa-sign-out-alt"></i>                                  </Button>
                  </div>
                  </div>
        </div>;
    }
}
 
export default Home;