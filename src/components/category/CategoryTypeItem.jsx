import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, FormControlLabel } from "@material-ui/core";
import IOSSwitch from "../switch/IOSSwitch";
import { CategoryContext } from "../../context/CategoryProvider";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 15,
    padding: "1.15rem 1rem",
    marginBottom: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  };

  return (
    <Card className={classes.root}>
      <div>{categoryType.name}</div>
      <FormControlLabel
        control={
          <IOSSwitch
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
