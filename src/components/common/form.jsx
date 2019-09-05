import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) {
      return null;
    }
    const errors = {};
    for (let item of error.details) {
      errors[item.path] = item.message;
    }
    return errors;
  };

  validateProperty = ({ id, value }) => {
    const inputField = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(inputField, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  handleChange = ({ currentTarget: currentInputField }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentInputField);
    if (errorMessage) {
      errors[currentInputField.id] = errorMessage;
    } else {
      delete errors[currentInputField.id];
    }
    const data = { ...this.state.data };
    data[currentInputField.id] = currentInputField.value;
    this.setState({ data, errors });
  };

  renderButton = (label, onClick) => {
    return (
      <button
        disabled={this.validate()}
        onClick={onClick}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        value={data[name]}
        type={name === "password" ? "password" : "text"}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        options={options}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
