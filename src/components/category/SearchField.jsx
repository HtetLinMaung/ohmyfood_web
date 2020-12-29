import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  input: {
    borderWidth: 0,
    padding: ".5rem .9rem",
    borderRadius: 15,
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
  },
}));

const SearchField = (props) => {
  const classes = useStyles();

  return <input type="text" className={classes.input} {...props} />;
};

export default SearchField;
