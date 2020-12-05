import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  input: {
    borderWidth: 0,
    padding: ".6rem .9rem",
    borderRadius: 10,
    width: "100%",
    color: "#E9E9E9",
    boxSizing: "border-box",
    backgroundColor: "#FEFEFE",
    transition: "all 0.3s",
    "&:focus": {
      color: "#545F6D",
      outline: "none",
      boxShadow:
        "0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important",
      "&::placeholder": {
        color: "#545F6D"
      }
    },
    "&::placeholder": {
      color: "#E9E9E9"
    }
  },
  errorLabel: {
    color: "red",
    fontSize: 12
  }
}));

const FocusTextField = (props) => {
  const classes = useStyles();
  const newProps = { ...props };
  delete newProps.errorLabel;

  let errorLabel = "";
  if (props.errorLabel) {
    errorLabel = <div className={classes.errorLabel}>{props.errorLabel}</div>;
  }

  return (
    <Fragment>
      <input {...newProps} className={`${classes.input} ${props.className}`} />
      {errorLabel}
    </Fragment>
  );
};

FocusTextField.propTypes = {
  className: PropTypes.string,
  errorLabel: PropTypes.string
};
FocusTextField.defaultProps = {
  className: ""
};

export default FocusTextField;
