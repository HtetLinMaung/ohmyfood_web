import {
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  Button,
  DialogContent,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 20,
    padding: "0.75rem 1rem",
    background: "#F66559",
    width: 370,
  },
  button: {
    textTransform: "capitalize",
    borderRadius: 10,
    fontSize: 12,
    width: "30%",
  },
  cancelBtn: {
    color: "#fff",
    borderColor: "#fff",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 13,
  },
  content: {
    color: "#fff",
    fontSize: 12,
  },
}));

const DeleteDialog = ({ open, onClose, handleDelete }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.root }}>
      <DialogTitle className={classes.title}>
        Are you sure you want to delete?
      </DialogTitle>
      <DialogContent className={classes.content}>
        Please be careful. Deleting action cannot be undone. Make sure you know
        what you are doing.
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          className={clsx(classes.button, classes.cancelBtn)}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          style={{ background: "#F44336", color: "#fff" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
