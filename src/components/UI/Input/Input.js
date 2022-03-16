import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        !props.isInputValid ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.inputId}>{props.inputLabel}</label>
      <input
        type={props.inputType}
        id={props.inputId}
        value={props.inputValue}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
