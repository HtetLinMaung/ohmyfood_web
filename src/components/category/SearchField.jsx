import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { CategoryContext } from "../../context/CategoryProvider";
import http from "../../utils/http";
import { AppContext } from "../../context/AppProvider";
import CategoryTypeItem from "./CategoryTypeItem";

const useStyles = makeStyles(() => ({
  root: {},

  input: {
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
      color: "#E9E9E9",
    },
  },
}));

const SearchField = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input type="text" className={classes.input} />
    </div>
  );
};

export default SearchField;
