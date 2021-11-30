import React from "react";
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
      <label htmlFor={name}>{label}</label>
      <div className="input-group mb-3">
        <select
          className="form-select"
          id={name}
          onChange={(id) => onChange({ name, id })}
          aria-label="Example select with button addon"
        >
          {options.map((item) => (
            <option value={item} key={item}>
              {" "}
              {item}{" "}
            </option>
          ))}
        </select>
      </div>

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
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Dropdown;
