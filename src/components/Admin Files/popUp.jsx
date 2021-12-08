import React from 'react';
import { Button } from 'reactstrap';

class Popup extends React.Component {
    render() {
      return (
        <div className='popup' style={{paddingRight: '-900px', 
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left:" 0",
        right: "0",
        bottom: "0",
        margin: "auto",
        zIndex: '1001',
        backgroundColor: "rgba(0,0,0, 0.5)"}}>
          <div style={{background: 'transparent', marginLeft: '800px', paddingRight: '0px',
        position: "absolute",
        textAlign: 'center',
        margin: "auto"}} className='popup_inner'>

            {/* <h1>{this.props.text}</h1> */}
          <Button  onClick={this.props.closePopup}>close me</Button>
          </div>
        </div>
      );
    }
  }

  export default Popup;