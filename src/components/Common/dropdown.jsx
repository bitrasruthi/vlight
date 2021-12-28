import React from "react";
import { Label, Input, Col} from 'reactstrap'
const Dropdown = ({
  name,
  error,
  label,
  onChange,
  getname,
  options,
  ...rest
}) => {
  return (
    <div className="form-group">
      <Col sm={{ size: 6 }} style={{width:'620px', marginLeft: '-12px', marginTop: '-100px', zIndex: 1001}}className='mr-sm-2'>
      <Label style={{marginTop: '100px', zIndex: 1001 }} htmlFor={name}>{label}</Label>

        <Input type='select'  style={{width: '280px'}} 
          className="form-select"
          id={name}
          onChange={(id) => onChange({ name, id })}
          aria-label="Example select with button addon"
        >
         
          {options.map((item) => (
           
            <option value={Object.values(item)} key={item.value}>
              {" "}
                          {Object.keys(item)}{" "}
            </option>
          ))}
        </Input>
        </Col>

      {/* <div className="input-group mb-3">
        <label className="input-group-text" id={name}>
          Options
        </label>
        <select className="form-select" id={name} {...rest}>
          {options.map((item) => (
            <option value={item} key={item}>
              {" "}
              {item}{" "}
            </option>
          ))}
        </select>
      </div> */}
      {error && <small id="emailHelp" class="form-text text-danger " style={{width: 'auto '}}>{error}</small>}

    </div>
  );
};

export default Dropdown;
