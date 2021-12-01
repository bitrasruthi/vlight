import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown style={{marginLeft: '-20px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle 
        style={{backgroundColor: 'white',border:"none", boxShadow:" none", fontWeight: "normal", color: 'darkgray'}} caret>
          Settings
        </DropdownToggle>
        <DropdownMenu>
        
          <DropdownItem><Link to="/holidays"> Holiday List</Link></DropdownItem>
          <DropdownItem><Link to="/officehours"> Office Hours</Link></DropdownItem>
        
        </DropdownMenu>
      </Dropdown>
    );
  }
}