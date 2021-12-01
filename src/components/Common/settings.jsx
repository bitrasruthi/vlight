import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
        style={{backgroundColor: 'white',border:"none", boxShadow:" none"}} caret>
          Settings
        </DropdownToggle>
        <DropdownMenu>
        
          <DropdownItem>Holiday List</DropdownItem>
        
        </DropdownMenu>
      </Dropdown>
    );
  }
}