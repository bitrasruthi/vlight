import React from 'react';
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media,
  } from "reactstrap";
const SearchBox = ({value, onChange}) => {
    return ( 
       
        <InputGroup style={{height: '50px', }} className="input-group-alternative">
                <InputGroupAddon style={{marginTop: '-15px'}} addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                <Input 
        type='text'
        name="query"
        className="form-control my-3"
        placeholder="search..."
        value={value}
        onChange={e=>onChange(e.currentTarget.value)}
        />
        </InputGroupAddon>
              </InputGroup>
     );
};
 
export default SearchBox;