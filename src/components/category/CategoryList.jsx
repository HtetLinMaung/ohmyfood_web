import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import { CategoryContext } from "../../context/CategoryProvider";
import http from "../../utils/http";
import { AppContext } from "../../context/AppProvider";
import SearchField from "./SearchField";
import { EditOutlined, DeleteOutline, Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    borderRadius: 15,
  },
  iconButton: {
    background: "#fff",
    padding: "0.5rem",
    boxShadow:
      "0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important",
  },
  icon: {
    color: "#70709c",
    fontSize: 20,
  },
  showAllButton: {
    textTransform: "capitalize",
    borderRadius: 15,
    fontSize: 12,
  },
  tableControl: {
    marginTop: "2rem",
  },
}));

const CategoryList = () => {
  const classes = useStyles();
  const [, setLoading] = useContext(AppContext);
  const [{ categoryType, categories }, dispatch] = useContext(CategoryContext);

  useEffect(() => {
    (async () => {
      const query = `
        query CategoryType($id: ID!) {
          categoryType(id: $id) {
              categories {
                  _id
                  name
                  price
                  discountPercent
                  openHour
                  closeHour
                  imageUrl
                  tags
              }
          }
        }
      `;

      if (categoryType) {
        setLoading(true);
        const response = await http.post({
          query,
          variables: {
            id: categoryType._id,
          },
        });
        setLoading(false);
        dispatch({
          type: "CATEGORIES",
          payload: response.data.categoryType.categories,
        });
      }
    })();
  }, [setLoading, dispatch, categoryType]);

  if (!categoryType) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <Grid container item lg={12} alignItems="center" spacing={1}>
        <Grid item>
          <h4 style={{ margin: 0 }}>{categoryType.name}</h4>
        </Grid>
        <Grid item style={{ flex: 1 }}></Grid>
        <Grid item>
          <IconButton
            size="small"
            aria-label="search"
            className={classes.iconButton}
          >
            <EditOutlined className={classes.icon} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            aria-label="search"
            className={classes.iconButton}
            style={{ background: "red" }}
          >
            <DeleteOutline className={classes.icon} style={{ color: "#fff" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.tableControl}>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            className={classes.showAllButton}
          >
            Show all
          </Button>
        </Grid>
        <Grid item style={{ flex: 1 }}></Grid>
        <Grid item lg={3}>
          <SearchField placeholder="Search..." />
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            aria-label="search"
            className={classes.iconButton}
          >
            <Search className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CategoryList;
