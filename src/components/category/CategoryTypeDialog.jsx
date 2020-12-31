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
import { CategoryContext } from "../../context/CategoryProvider";

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

const CategoryTypeDialog = () => {
  const [state, dispatch] = useContext(AppContext);
  const [
    { name, image, imageSrc, isUpdate, categoryType, typeDialog },
    categoryDispatch,
  ] = useContext(CategoryContext);
  const classes = useStyles();
  const [nameErrLabel, setNameErrLabel] = useState("");

  const onClose = () => {
    categoryDispatch({
      type: "SET_STATE",
      payload: {
        typeDialog: false,
        name: "",
        image: null,
        imageSrc: "",
        isUpdate: false,
      },
    });
  };

  const saveHandler = async () => {
    if ((image || imageSrc) && name && !state.loading) {
      const formData = new FormData();
      dispatch({ type: "LOADING", payload: true });

      if (!isUpdate) {
        formData.append("image", image);
        formData.append("oldImage", "");

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
        categoryDispatch({ type: "TYPE_CHANGE", payload: "save" });
      } else {
        let oldImage = categoryType.imageUrl;

        if (image) {
          formData.append("image", image);
          formData.append("oldImage", oldImage);
          const { imageUrl } = await http.upload(formData);
          oldImage = imageUrl;
        }

        const query = `
          mutation UpdateCategoryType($id: ID!, $name: String!, $imageUrl: String!, $include: Boolean!, $categories: [String!]) {
            updateCategoryType(id: $id, categoryTypeInput: {name: $name, imageUrl: $imageUrl, include: $include, categories: $categories}) {
                _id
            }
          }
        `;

        await http.post({
          query,
          variables: {
            id: categoryType._id,
            name,
            imageUrl: oldImage,
            include: categoryType.include,
            categories: categoryType.categories.map((category) => category._id),
          },
        });
        categoryDispatch({
          type: "SET_STATE",
          payload: {
            isUpdate: false,
            categoryTypeChanged: "update",
          },
        });
      }

      dispatch({ type: "LOADING", payload: false });
      onClose();
    }
  };

  const setImage = (file) => {
    categoryDispatch({ type: "IMAGE", payload: file });
  };

  const nameChangeHandler = (e) => {
    setNameErrLabel("");
    if (!e.target.value) {
      setNameErrLabel("Name must not be empty!");
    }
    categoryDispatch({ type: "NAME", payload: e.target.value });
  };

  return (
    <Dialog
      open={typeDialog}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle style={{ textAlign: "center" }}>
        {isUpdate ? "Update" : "New"} Category Type
      </DialogTitle>
      <DialogContent style={{ padding: "0 3rem" }}>
        <Grid
          container
          spacing={1}
          justify="center"
          style={{ marginBottom: "1rem" }}
        >
          <Grid item>
            <ImageUploader
              src={imageSrc}
              width={115}
              height={120}
              onUpload={setImage}
            />
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
          disabled={(!image && !imageSrc) || !!nameErrLabel}
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

export default CategoryTypeDialog;
