import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
const Inputs = ({name, error, label, ...rest}) => {
    return ( 
        <div className="form-group">
                    <label htmlFor={name}>{label}</label>
<FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    </InputGroupText>
                  </InputGroupAddon>
                  <input  {...rest}
                            id={name} 
                            name={name} 
                            className="form-control" />
                </InputGroup>
              </FormGroup>
                    {/* <input  {...rest}
                            id={name} 
                            name={name} 
                            className="form-control" /> */}
                    {error && <div className="alert alert-danger">{error}</div>}        
                </div>
     );
}

 
export default Inputs;





