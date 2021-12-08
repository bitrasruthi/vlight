import React from 'react';
import Popup from './popUp';


class PopupMess extends React.Component {
    constructor() {
      super();
      this.state = {
        showPopup: false
      };
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    render() {
      return (
        <div className='app'>
          <h1>hihi</h1>
          <button onClick={this.togglePopup.bind(this)}>show popup</button>
          {this.state.showPopup ? 
            <Popup
              text='Close Me'
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
        </div>
      );
    }
  };
  

  export default PopupMess;
  
  