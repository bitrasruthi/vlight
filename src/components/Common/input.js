import React from 'react';
import {
 
    FormGroup,
   
    InputGroupAddon,
    InputGroupText,
    InputGroup,
  
  } from "reactstrap";
const Inputs = ({name, error, label, max,min, ...rest}) => {
  console.log({...rest})
  
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
                           max={max}
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





