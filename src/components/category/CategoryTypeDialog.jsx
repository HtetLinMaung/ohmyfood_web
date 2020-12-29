import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "../form/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ImageUploader from "../upload/ImageUploader";
import http from "../../utils/http";
import { AppContext } from "../../context/AppProvider";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 20,
    padding: "1.4rem 1rem",
  },
  button: {
    textTransform: "capitalize",
    borderRadius: 10,
    fontSize: 12,
    width: "40%",
  },
}));

const CategoryTypeDialog = ({ open, onClose }) => {
  const [state, dispatch] = useContext(AppContext);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [nameErrLabel, setNameErrLabel] = useState("");
  const [image, setImage] = useState(null);

  const saveHandler = async () => {
    if (image && name && !state.loading) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("oldImage", "");
      dispatch({ type: "LOADING", payload: true });
      const { imageUrl } = await http.upload(formData);

      const query = `
        mutation CreateCategoryType($name: String!, $imageUrl: String!, $include: Boolean!, $categories: [String!]) {
          createCategoryType(categoryTypeInput: {name: $name, imageUrl: $imageUrl, include: $include, categories: $categories}) {
              _id
          }
        }
      `;
      await http.post({
        query,
        variables: {
          name,
          imageUrl,
          include: true,
          categories: [],
        },
      });
      dispatch({ type: "LOADING", payload: false });
      onClose();
    }
  };

  const nameChangeHandler = (e) => {
    setNameErrLabel("");
    if (!e.target.value) {
      setNameErrLabel("Name must not be empty!");
    }
    setName(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.root }}>
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
            <ImageUploader width={115} height={120} onUpload={setImage} />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          justify="center"
          style={{ marginBottom: "1.5rem" }}
        >
          <Grid item>
            <TextField
              placeholder="Name"
              errorLabel={nameErrLabel}
              value={name}
              onChange={nameChangeHandler}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions style={{ justifyContent: "center" }}>
        <Button variant="outlined" className={classes.button} onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={!image || !!nameErrLabel}
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
