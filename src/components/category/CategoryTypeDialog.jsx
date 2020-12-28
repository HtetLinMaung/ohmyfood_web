import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "../form/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ImageUploader from "../upload/ImageUploader";

const useStyles = makeStyles(() => ({
  button: {
    textTransform: "capitalize",
    borderRadius: 10,
    fontSize: 12,
    width: "40%",
  },
}));

const CategoryTypeDialog = ({ open, onClose }) => {
  const classes = useStyles();

  const uploadHandler = (file) => {};

  const saveHandler = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: "center" }}>
        New Category Type
      </DialogTitle>
      <DialogContent style={{ padding: "0 3rem" }}>
        <Grid
          container
          spacing={1}
          justify="center"
          style={{ marginBottom: "1rem" }}
        >
          <Grid item>
            <ImageUploader width={115} height={120} onUpload={uploadHandler} />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          justify="center"
          style={{ marginBottom: "2rem" }}
        >
          <Grid item>
            <TextField placeholder="Name" raised={true} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions style={{ justifyContent: "center" }}>
        <Button variant="outlined" className={classes.button} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          style={{ background: "#3696F8", color: "#fff" }}
          onClick={saveHandler}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryTypeDialog;
