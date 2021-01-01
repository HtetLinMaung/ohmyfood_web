import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import TextField from "../form/TextField";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 10,
    height: 140,
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
  chip: {
    textTransform: "none",
    fontSize: 11,
    margin: ".2rem",
  },
  btnLabel: {
    display: "flex",
    flexWrap: "wrap",
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

  const handleClickChip = (e, i) => {
    e.stopPropagation();
    onTagAdded(tags.filter((_, index) => index !== i));
  };

  const Chips = () =>
    tags.map((tag, i) => (
      <Chip
        className={classes.chip}
        label={tag}
        key={i}
        onClick={(e) => handleClickChip(e, i)}
      />
    ));

  const Label = () =>
    label ? <Box className={classes.label}>{label}</Box> : null;

  return (
    <Fragment>
      <Label />
      <Button
        variant="outlined"
        className={classes.root}
        classes={{ label: classes.btnLabel }}
        onClick={() => setOpen(true)}
      >
        <Chips />
      </Button>
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
