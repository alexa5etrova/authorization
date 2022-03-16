import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "EMAIL_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("validation");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("clean");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: "EMAIL_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: "PASSWORD_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          inputType="email"
          inputId="email"
          isInputValid={emailState.isValid}
          inputValue={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          inputLabel="Email"
        />
        <Input
          inputType="password"
          inputId="password"
          isInputValid={passwordState.isValid}
          inputValue={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          inputLabel="Password"
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
