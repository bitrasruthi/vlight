import React from "react";
import Joi from "joi-browser";
import Inputs from "./input";
// import Select from './select';

class Forms extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;
    this.doSubmit();
  };

  handleselect = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    console.log(input.value);
    data[input.name] = input.value;

    this.setState({ data });
    console.log(this.state);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    // const notify = () => toast("Login Successful");
    return (
      <button disabled={this.validate()} className="loginbtn btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Inputs
        name={name}
        type={type}
        onChange={this.handleChange}
        value={data[name]}
        label={label}
        error={errors[name]}
      />
    );
  }
 
}

export default Forms;
