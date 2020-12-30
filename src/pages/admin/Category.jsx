import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CategoryTypeList from "../../components/category/CategoryTypeList";
import CategoryList from "../../components/category/CategoryList";
import CategoryTypeDialog from "../../components/category/CategoryTypeDialog";
import { CategoryContext } from "../../context/CategoryProvider";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "5.5rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
}));

const Category = () => {
  const classes = useStyles();
  const [{ typeDialog }, dispatch] = useContext(CategoryContext);

  const handleTypeDialogClose = () => {
    dispatch({
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

  return (
    <Box className={classes.root}>
      <h3>Category</h3>
      <Grid container>
        <Grid item lg={2}>
          <CategoryTypeList />
        </Grid>
        <Grid item lg={10} style={{ paddingLeft: "2rem" }}>
          <CategoryList />
        </Grid>
      </Grid>
      <CategoryTypeDialog open={typeDialog} onClose={handleTypeDialogClose} />
    </Box>
  );
};

export default Category;
