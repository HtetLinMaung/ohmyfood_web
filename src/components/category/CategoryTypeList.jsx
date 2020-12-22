import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { CategoryContext } from "../../context/CategoryProvider";
import http from "../../utils/http";
import { AppContext } from "../../context/AppProvider";
import CategoryTypeItem from "./CategoryTypeItem";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CategoryTypeList = () => {
  const classes = useStyles();
  const [, setLoading] = useContext(AppContext);
  const [state, dispatch] = useContext(CategoryContext);

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
        type: "CATEGORY_TYPES",
        payload: response.data.categoryTypes.categoryTypes,
      });
    })();
  }, [setLoading, dispatch]);

  return (
    <Box className={classes.root}>
      {state.categoryTypes.map((categoryType) => (
        <CategoryTypeItem categoryType={categoryType} key={categoryType._id} />
      ))}
    </Box>
  );
};

export default CategoryTypeList;
