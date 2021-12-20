import React from 'react';
import {
 
    FormGroup,
   
    InputGroupAddon,
    InputGroupText,
    InputGroup,
  
  } from "reactstrap";
const Inputs = ({name, error, label, max,min, ...rest}) => {
  
    return ( 
        <div className="form-group">
<FormGroup>
                    <label htmlFor={name}>{label}</label>
                {/* <InputGroup className="input-group-alternative"> */}
                 
                  <input  {...rest}
                           max={max}
                           min={min}
                            id={name} 
                            name={name} 
                            className="form-control" />
                {/* </InputGroup> */}
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





