import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import { CategoryContext } from "../../context/CategoryProvider";
import http from "../../utils/http";
import { AppContext } from "../../context/AppProvider";
import CategoryTypeItem from "./CategoryTypeItem";
import SearchField from "./SearchField";
import { Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CategoryTypeDialog from "../category/CategoryTypeDialog";

const useStyles = makeStyles(() => ({
  root: {},
  wrapper: {
    marginTop: "1rem",
  },
  iconButton: {
    background: "#fff",
    padding: "0.5rem",
  },
  icon: {
    color: "#70709c",
    fontSize: 20,
  },
  nextPrevIcon: {
    color: "#70709c",
    fontSize: 10,
  },
  addButton: {
    textTransform: "capitalize",
    borderRadius: 15,
    fontSize: 12,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const CategoryTypeList = () => {
  const classes = useStyles();
  const [, setLoading] = useContext(AppContext);
  const [state, dispatch] = useContext(CategoryContext);
  const [typeDialog, setTypeDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const query = `
        query CategoryTypes($page: Int!, $perPage: Int!) {
          categoryTypes(page: $page, perPage: $perPage) {
              categoryTypes {
                  _id
                  name
                  imageUrl
                  include
                  categories {
                    _id
                  }
              }
          }
        }
      `;

      setLoading(true);
      const response = await http.post({
        query,
        variables: {
          page: 0,
          perPage: 0,
        },
      });
      setLoading(false);
      dispatch({
        type: "SET_STATE",
        payload: {
          categoryTypes: response.data.categoryTypes.categoryTypes.map(
            (type, i) => ({
              ...type,
              selected: i === 0 ? true : false,
            })
          ),
          categoryType: response.data.categoryTypes.categoryTypes.length
            ? response.data.categoryTypes.categoryTypes[0]
            : null,
        },
      });
    })();
  }, [setLoading, dispatch]);

  const handleTypeDialogClose = () => {
    setTypeDialog(false);
  };

  return (
    <Box className={classes.root}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item lg={10}>
          <SearchField />
        </Grid>
        <Grid item lg={2}>
          <IconButton
            size="small"
            aria-label="search"
            className={classes.iconButton}
          >
            <Search className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
      <Box className={classes.wrapper}>
        {state.categoryTypes.map((categoryType) => (
          <CategoryTypeItem
            categoryType={categoryType}
            key={categoryType._id}
          />
        ))}
      </Box>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        className={classes.wrapper}
      >
        <Grid item>
          <IconButton
            size="small"
            aria-label="prev"
            className={classes.iconButton}
          >
            <ArrowBackIosIcon className={classes.nextPrevIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            className={classes.addButton}
            onClick={() => setTypeDialog(true)}
          >
            Add more
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            aria-label="next"
            className={classes.iconButton}
          >
            <ArrowForwardIosIcon className={classes.nextPrevIcon} />
          </IconButton>
        </Grid>
      </Grid>
      <CategoryTypeDialog open={typeDialog} onClose={handleTypeDialogClose} />
    </Box>
  );
};

export default CategoryTypeList;
