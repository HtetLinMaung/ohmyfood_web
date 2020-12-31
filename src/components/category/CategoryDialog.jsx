import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { CategoryContext } from "../../context/CategoryProvider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ImageUploader from "../upload/ImageUploader";
import TextField from "../form/TextField";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 20,
    padding: "1.4rem 1rem",
    width: 600,
  },
  button: {
    textTransform: "capitalize",
    borderRadius: 10,
    fontSize: 12,
    width: "20%",
  },
}));

const CategoryDialog = () => {
  const classes = useStyles();
  const [{ isUpdate, categoryDialog, imageSrc }, categoryDispatch] = useContext(
    CategoryContext
  );

  const onClose = () => {
    categoryDispatch({
      type: "SET_STATE",
      payload: {
        categoryDialog: false,
      },
    });
  };

  const saveHandler = () => {};

  const setImage = (file) => {
    categoryDispatch({ type: "IMAGE", payload: file });
  };

  return (
    <Dialog
      open={categoryDialog}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>{isUpdate ? "Update" : "New"} Category</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid itme style={{ flex: 1 }}>
            <TextField outlined label="Category Name" />
          </Grid>
          <Grid item>
            <ImageUploader
              src={imageSrc}
              width={115}
              height={120}
              onUpload={setImage}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" className={classes.button} onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={false}
          variant="contained"
          className={classes.button}
          style={{ background: "#3696F8", color: "#fff" }}
          onClick={saveHandler}
        >
          {isUpdate ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
