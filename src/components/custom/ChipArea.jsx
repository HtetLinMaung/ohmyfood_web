import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import TextField from "../form/TextField";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 10,
    height: 160,
    width: "100%",
    "&:hover": {
      background: "#fff",
    },
  },
  label: {
    fontSize: 13,
    lineHeight: 2,
  },
  dialog: {
    borderRadius: 10,
    width: 200,
  },
}));

const ChipArea = ({ label, onTagAdded, tags = [] }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");

  const onClose = () => {
    const newTags = tag ? [...tags, tag] : tags;
    onTagAdded(newTags);
    setOpen(false);
    setTag("");
  };

  const Label = () =>
    label ? <Box className={classes.label}>{label}</Box> : null;

  return (
    <Fragment>
      <Label />
      <Button
        variant="outlined"
        className={classes.root}
        onClick={() => setOpen(true)}
      ></Button>
      <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
        <TextField
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          hideErrorLabel
        />
      </Dialog>
    </Fragment>
  );
};

export default ChipArea;
