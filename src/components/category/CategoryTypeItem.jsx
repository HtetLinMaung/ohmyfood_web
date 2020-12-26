import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, FormControlLabel } from "@material-ui/core";
import IOSSwitch from "../switch/IOSSwitch";
import { CategoryContext } from "../../context/CategoryProvider";
import http from "../../utils/http";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 10,
    padding: "0.5rem 1rem",
    marginBottom: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      boxShadow:
        "0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important",
    },
  },
  label: {
    marginRight: 0,
  },
  text: {
    fontSize: 13,
  },
}));

const CategoryTypeItem = ({ categoryType }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(CategoryContext);

  const handleChange = (event) => {
    dispatch({
      type: "CATEGORY_TYPES",
      payload: state.categoryTypes.map((type) => {
        if (type._id === categoryType._id) {
          return { ...type, [event.target.name]: event.target.checked };
        }
        return type;
      }),
    });
    const query = `
      mutation UpdateCategoryType($id: ID!, $name: String!, $imageUrl: String!, $include: Boolean!, $categories: [String!]) {
        updateCategoryType(id: $id, categoryTypeInput: {name: $name, imageUrl: $imageUrl, include: $include, categories: $categories}) {
            _id
            updatedAt
        }
      }
    `;
    http.post({
      query,
      variables: {
        id: categoryType._id,
        name: categoryType.name,
        imageUrl: categoryType.imageUrl,
        include: event.target.checked,
        categories: categoryType.categories.map((category) => category._id),
      },
    });
  };

  const handleClick = () => {
    if (categoryType.selected) return;
    dispatch({
      type: "SET_STATE",
      payload: {
        categoryTypes: state.categoryTypes.map((type) => {
          if (type._id === categoryType._id) {
            return { ...type, selected: true };
          }
          return { ...type, selected: false };
        }),
        categoryType: categoryType,
      },
    });
  };

  return (
    <Card
      className={classes.root}
      raised={categoryType.selected}
      onClick={handleClick}
    >
      <div className={classes.text}>{categoryType.name}</div>
      <FormControlLabel
        classes={{ root: classes.label }}
        control={
          <IOSSwitch
            onClick={(event) => event.stopPropagation()}
            checked={categoryType.include}
            onChange={handleChange}
            name="include"
          />
        }
      />
    </Card>
  );
};

export default CategoryTypeItem;
