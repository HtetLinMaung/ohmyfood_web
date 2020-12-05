import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Category = () => {
  const classes = useStyles();

  return <div className={classes.root}>Category</div>;
};

export default Category;
