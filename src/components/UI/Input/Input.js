import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return { focus: activate };
  });

  return (
    <div
      className={`${classes.control} ${
        !props.isInputValid ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.inputId}>{props.inputLabel}</label>
      <input
        ref={inputRef}
        type={props.inputType}
        id={props.inputId}
        value={props.inputValue}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
