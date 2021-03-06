import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";

const inputStyle = {
  borderWidth: 0,
  padding: ".6rem .9rem",
  borderRadius: 10,
  width: "100%",
  color: "#545F6D",
  boxSizing: "border-box",
  backgroundColor: "#FEFEFE",
  transition: "all 0.3s",
  "&:focus": {
    color: "#545F6D",
    outline: "none",
    boxShadow:
      "0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important",
    "&::placeholder": {
      color: "#545F6D",
    },
  },
  "&::placeholder": {
    color: "#545F6D",
  },
};

const useStyles = makeStyles(() => ({
  input: {
    boxShadow:
      "0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important",
    ...inputStyle,
  },
  focus: {
    ...inputStyle,
    color: "#E9E9E9",
  },
  errorLabel: {
    color: "red",
    fontSize: 11,
    height: 17,
  },
  outlined: {
    ...inputStyle,
    boxShadow: "none",
    border: "1px solid #c4c4c4",
    borderWidth: 1,
    fontSize: 12,
    "&:focus": {
      boxShadow: "none",
      outline: "none",
      borderColor: "#3696f8",
    },
  },
  label: {
    fontSize: 13,
    lineHeight: 2,
  },
}));

const TextField = (props) => {
  const classes = useStyles();
  const inputProps = { ...props };
  delete inputProps.errorLabel;
  delete inputProps.label;
  delete inputProps.hideErrorLabel;
  delete inputProps.outlined;
  delete inputProps.focus;

  const Label = () =>
    props.label ? <Box className={classes.label}>{props.label}</Box> : null;

  const ErrorLabel = () =>
    !props.hideErrorLabel ? (
      <Box className={classes.errorLabel}>{props.errorLabel}</Box>
    ) : null;

  return (
    <Fragment>
      <Label />
      <input
        type="text"
        className={clsx({
          [classes.input]: !props.focus && !props.outlined,
          [classes.focus]: props.focus && !props.outlined,
          [classes.outlined]: props.outlined && !props.focus,
        })}
        {...inputProps}
        style={{
          borderColor: props.outlined && props.errorLabel ? "red" : "#c4c4c4",
        }}
      />
      <ErrorLabel />
    </Fragment>
  );
};

export default TextField;
