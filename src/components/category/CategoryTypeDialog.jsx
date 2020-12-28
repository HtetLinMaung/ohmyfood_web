import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "../form/TextField";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CategoryTypeDialog = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Category Type</DialogTitle>
      <Grid container spacing={1}>
        <Grid item>
          <TextField raised={true} />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default CategoryTypeDialog;
