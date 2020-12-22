import React, { useContext, useEffect } from "react";
import { production } from "../../app.config.json";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "../../context/AppProvider";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "5.5rem",
    paddingLeft: "2rem",
  },
}));

const Category = () => {
  const [, setLoading] = useContext(AppContext);

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
      const response = await fetch(production.gql_api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ohmyfood_token")}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            page: 0,
            perPage: 0,
          },
        }),
      }).then((res) => res.json());
      setLoading(false);
      console.log(response);
    })();
  }, [setLoading]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>Category</h3>
      <Grid container></Grid>
    </div>
  );
};

export default Category;
