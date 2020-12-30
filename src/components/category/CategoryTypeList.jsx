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
  const [, dispatchApp] = useContext(AppContext);
  const [state, dispatch] = useContext(CategoryContext);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const perPage = 5;
  const { categoryTypeChanged } = state;

  useEffect(() => {
    (async () => {
      const query = `
        query CategoryTypes($page: Int!, $perPage: Int!) {
          categoryTypes(page: $page, perPage: $perPage) {
              totalRows
              page
              perPage
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

      dispatchApp({ type: "LOADING", payload: true });
      const response = await http.post({
        query,
        variables: {
          page,
          perPage,
        },
      });
      dispatchApp({ type: "LOADING", payload: false });
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
      setTotalPage(Math.ceil(response.data.categoryTypes.totalRows / perPage));
    })();
  }, [dispatchApp, dispatch, page, setTotalPage, categoryTypeChanged]);

  const handlePageChange = (type) => {
    switch (type) {
      case "next":
        if (page !== totalPage) setPage(page + 1);
        break;
      default:
        if (page !== 1) setPage(page - 1);
    }
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
            onClick={handlePageChange.bind(this, "prev")}
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
            onClick={() => dispatch({ type: "TYPE_DIALOG", payload: true })}
          >
            Add more
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handlePageChange.bind(this, "next")}
            size="small"
            aria-label="next"
            className={classes.iconButton}
          >
            <ArrowForwardIosIcon className={classes.nextPrevIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryTypeList;
