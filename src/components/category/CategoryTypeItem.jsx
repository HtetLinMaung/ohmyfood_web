import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, FormControlLabel } from "@material-ui/core";
import IOSSwitch from "../switch/IOSSwitch";
import { CategoryContext } from "../../context/CategoryProvider";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 10,
    padding: "0.5rem 1rem",
    marginBottom: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  };

  const handleClick = () => {
    dispatch({
      type: "CATEGORY_TYPES",
      payload: state.categoryTypes.map((type) => {
        if (type._id === categoryType._id) {
          return { ...type, selected: true };
        }
        return { ...type, selected: false };
      }),
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
