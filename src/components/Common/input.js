import React from 'react';
import ReactTooltip from 'react-tooltip';
import {
 
    FormGroup,
   
    InputGroupAddon,
    InputGroupText,
    InputGroup,
  
  } from "reactstrap";
const Inputs = ({name, error, label, max,min, ...rest}) => {
  
    return ( 
        <div className="form-group"  data-placement="top" title={error}>
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
                <small id="emailHelp" class="form-text text-danger " >{error}</small>
              </FormGroup>
                    {/* <input  {...rest}
                            id={name} 
                            name={name} 
                            className="form-control" /> */}
                            
                    {/* {error && <div data-tip={error} ></div>}         */}
                    {/* {error && <div className="alert alert-danger">{error}</div>}         */}
                </div>
     );
}

 
export default Inputs;





