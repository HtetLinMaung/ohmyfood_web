import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { CategoryContext } from "../../context/CategoryProvider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ImageUploader from "../upload/ImageUploader";
import TextField from "../form/TextField";
import TimePicker from "../form/TimePicker";
import ChipArea from "../custom/ChipArea";
import MultiSelect from "../form/MultiSelect";
import { AppContext } from "../../context/AppProvider";
import http from "../../utils/http";

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
  const [, dispatch] = useContext(AppContext);
  const [
    { isUpdate, categoryDialog, imageSrc, openHour, closeHour, tags, types },
    categoryDispatch,
  ] = useContext(CategoryContext);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    (async () => {
      const query = `
        query CategoryTypes($page: Int!, $perPage: Int!) {
          categoryTypes(page: $page, perPage: $perPage) {
              categoryTypes {
                  key: _id
                  value: name
              }
          }
        }
      `;

      dispatch({ type: "LOADING", payload: true });
      const response = await http.post({
        query,
        variables: {
          page: 0,
          perPage: 0,
        },
      });
      dispatch({ type: "LOADING", payload: false });
      setTypeList(response.data.categoryTypes.categoryTypes);
    })();
  }, [dispatch]);

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

  const onSelectChange = (e) => {
    categoryDispatch({ type: "TYPES", payload: e.target.value });
  };

  return (
    <Dialog
      open={categoryDialog}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <DialogTitle>{isUpdate ? "Update" : "New"} Category</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item lg={7}>
            <TextField outlined label="Category Name" />

            <Grid container spacing={1}>
              <Grid item lg={6}>
                <TextField outlined label="Price" />
              </Grid>
              <Grid item lg={6}>
                <TextField outlined label="Discount Percent" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={5} container justify="flex-end" alignItems="center">
            <ImageUploader
              src={imageSrc}
              width={172.5}
              height={177}
              onUpload={setImage}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item lg={3}>
            <TimePicker
              label="Open Hour"
              value={openHour}
              onChange={(date) =>
                categoryDispatch({ type: "OPEN_HOUR", payload: date })
              }
            />
          </Grid>
          <Grid item lg={3}>
            <TimePicker
              label="Close Hour"
              value={closeHour}
              onChange={(date) =>
                categoryDispatch({ type: "CLOSE_HOUR", payload: date })
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item lg={12}>
            <ChipArea
              label="Tags"
              tags={tags}
              onTagAdded={(tags) =>
                categoryDispatch({ type: "TAGS", payload: tags })
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item lg={5}>
            <MultiSelect
              items={typeList}
              value={types}
              onChange={onSelectChange}
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
