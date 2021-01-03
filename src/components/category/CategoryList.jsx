import React, {
  useContext,
  useEffect,
  Fragment,
  useState,
  useCallback,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Box } from "@material-ui/core";
import { CategoryContext } from "../../context/CategoryProvider";
import http from "../../utils/http";
import { AppContext } from "../../context/AppProvider";
import SearchField from "./SearchField";
import {
  EditOutlined,
  DeleteOutline,
  Search,
  SortOutlined,
  List,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import GridTable from "../table/GridTable";
import Pagination from "../table/Pagination";
import Select from "../form/Select";
import DeleteDialog from "../DeleteDialog";
import moment from "moment";

const buttonStyle = {
  textTransform: "capitalize",
  color: "#fff",
  borderRadius: 4,
  width: "100%",
};

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
    padding: "0 1rem",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  paginationWrapper: {
    padding: "0 1rem",
  },
  addButton: {
    ...buttonStyle,
    background: "#3696F8",
    "&:active": {
      background: "#3696F8",
    },
    "&:hover": {
      background: "#3696F8",
    },
  },
  exportButton: {
    ...buttonStyle,
    background: "green",
    "&:active": {
      background: "green",
    },
    "&:hover": {
      background: "green",
    },
  },
  printButton: {
    ...buttonStyle,
    background: "#F23F6D",
    "&:active": {
      background: "#F23F6D",
    },
    "&:hover": {
      background: "#F23F6D",
    },
  },
}));

const CategoryList = () => {
  const classes = useStyles();
  const [state, dispatchApp] = useContext(AppContext);
  const [
    { categoryType, categories, categoryChanged, category },
    dispatch,
  ] = useContext(CategoryContext);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const headers = [
    {
      key: "name",
      text: "Category Name",
    },
    {
      key: "price",
      text: "Price",
    },
    {
      key: "discountPercent",
      text: "Discount Percent",
    },
    {
      key: "openHour",
      text: "Open Hour",
    },
    {
      key: "closeHour",
      text: "Close Hour",
    },
    {
      key: "tags",
      text: "Tags",
    },
    {
      key: "",
      text: "",
    },
  ];

  const fetchCategoriesByCategoryType = useCallback(() => {
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
                    types {
                      _id
                    }
                }
            }
          }
        `;

      if (categoryType) {
        dispatchApp({ type: "LOADING", payload: true });
        const response = await http.post({
          query,
          variables: {
            id: categoryType._id,
          },
        });
        dispatchApp({ type: "LOADING", payload: false });
        const { categories } = response.data.categoryType;
        dispatch({
          type: "CATEGORIES",
          payload: categories,
        });
        setTotalPage(Math.ceil(categories.length / perPage));
      }
    })();
  }, [dispatchApp, dispatch, categoryType, perPage]);

  useEffect(() => {
    fetchCategoriesByCategoryType();
  }, [fetchCategoriesByCategoryType, categoryType, perPage]);

  useEffect(() => {
    if (categoryType && categoryChanged === categoryType._id) {
      fetchCategoriesByCategoryType();
    }
  }, [categoryChanged, categoryType, fetchCategoriesByCategoryType]);

  const handleEdit = () => {
    dispatch({
      type: "SET_STATE",
      payload: {
        name: categoryType.name,
        imageSrc: categoryType.imageUrl,
        typeDialog: true,
        isUpdate: true,
      },
    });
  };

  const handleDelete = () => {
    dispatchApp({
      type: "SET_STATE",
      payload: {
        deleteDialog: true,
        deleteId: categoryType._id,
        deleteQuery: `
          mutation DeleteCategoryType($id: ID!, $permanent: Boolean!) {
            deleteCategoryType(id: $id, permanent: $permanent)
          }
        `,
      },
    });
  };

  const deleteData = async () => {
    onClose();
    dispatchApp({ type: "LOADING", payload: true });

    await http.post({
      query: state.deleteQuery,
      variables: {
        id: state.deleteId,
        permanent: false,
      },
    });

    dispatchApp({ type: "LOADING", payload: false });
    dispatch({ type: "TYPE_CHANGE", payload: "delete" });
  };

  const handleCategoryEdit = (item) => {
    dispatch({
      type: "SET_STATE",
      payload: {
        isUpdate: true,
        categoryDialog: true,
        imageSrc: item.imageUrl,
        openHour: new Date(item.openHour),
        closeHour: new Date(item.closeHour),
        tags: item.tags,
        types: item.types.map((type) => type._id),
        name: item.name,
        price: item.price,
        discountPercent: item.discountPercent,
        category: item,
      },
    });
  };

  const handleCategoryDelete = (item) => {
    dispatchApp({
      type: "SET_STATE",
      payload: {
        deleteDialog: true,
        deleteId: category._id,
        deleteQuery: `
            mutation DeleteCategory($id: ID!, $permanent: Boolean!) {
              deleteCategory(id: $id, permanent: $permanent)
            }
        `,
      },
    });
  };

  const onClose = () => {
    dispatchApp({ type: "DELETE_DIALOG", payload: false });
  };

  if (!categoryType) {
    return null;
  }

  return (
    <Box>
      <Card className={classes.root}>
        <Grid container item lg={12} alignItems="center" spacing={1}>
          <Grid item>
            <h4 style={{ margin: 0 }}>{categoryType.name}</h4>
          </Grid>
          <Grid item style={{ flex: 1 }}></Grid>
          <Grid item>
            <IconButton
              size="small"
              aria-label="edit"
              className={classes.iconButton}
              onClick={handleEdit}
            >
              <EditOutlined className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              aria-label="delete"
              className={classes.iconButton}
              style={{ background: "#F44336" }}
              onClick={handleDelete}
            >
              <DeleteOutline
                className={classes.icon}
                style={{ color: "#fff" }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          justify="flex-end"
          style={{ marginTop: "1rem" }}
        >
          <Grid item>
            <Button
              size="small"
              variant="contained"
              className={classes.addButton}
              onClick={() =>
                dispatch({ type: "CATEGORY_DIALOG", payload: true })
              }
            >
              Add
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              className={classes.exportButton}
            >
              Export Excel
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              className={classes.printButton}
            >
              Print
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.tableControl}>
          <Grid item>
            <IconButton size="small">
              <List />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size="small">
              <SortOutlined />
            </IconButton>
          </Grid>
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
        <GridTable headers={headers} items={categories}>
          {({ item }) => (
            <Fragment>
              <Grid item style={{ flex: 1 }}>
                {item.name}
              </Grid>
              <Grid item style={{ flex: 1 }}>
                {item.price}
              </Grid>
              <Grid item style={{ flex: 1 }}>
                {item.discountPercent}
              </Grid>
              <Grid item style={{ flex: 1 }}>
                {moment(item.openHour).format("h:mm a")}
              </Grid>
              <Grid item style={{ flex: 1 }}>
                {moment(item.closeHour).format("h:mm a")}
              </Grid>
              <Grid item style={{ flex: 1 }}>
                {item.tags.join(", ")}
              </Grid>
              <Grid item container style={{ flex: 1 }} justify="space-around">
                <Grid item>
                  <IconButton
                    size="small"
                    onClick={handleCategoryEdit.bind(this, item)}
                  >
                    <EditOutlined className={classes.icon} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    size="small"
                    onClick={handleCategoryDelete.bind(this, item)}
                  >
                    <DeleteOutline className={classes.icon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </GridTable>
        <Grid
          container
          justify="space-between"
          className={classes.paginationWrapper}
        >
          <Grid item></Grid>
          <Grid item>
            <Pagination
              count={totalPage}
              page={page}
              onPageChange={(page) => setPage(page)}
            />
          </Grid>
          <Grid item>
            <Select
              value={perPage}
              onChange={setPerPage}
              items={[10, 20, 30]}
            />
          </Grid>
        </Grid>
      </Card>
      <DeleteDialog
        open={state.deleteDialog}
        onClose={onClose}
        handleDelete={deleteData}
      />
    </Box>
  );
};

export default CategoryList;
