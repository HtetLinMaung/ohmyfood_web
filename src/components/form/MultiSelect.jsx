import React, { Fragment } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  select: {
    background: "#fff",
    "&:focus": {
      background: "#fff!important",
    },
  },
  outlined: {
    padding: ".381rem .9rem",
    borderRadius: 10,
    width: "100%",
    color: "#545F6D",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    transition: "all 0.3s",
    boxShadow: "none",
    border: "1px solid #c4c4c4",
    borderWidth: 1,
    fontSize: 12,
    "&.MuiInput-underline:before, &.MuiInput-underline:after": {
      display: "none !important",
    },
  },
  label: {
    fontSize: 13,
    lineHeight: 2,
  },
}));

const MultiSelect = ({ items, onChange, value = [] }) => {
  const classes = useStyles();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Fragment>
      <Box id="demo-mutiple-checkbox-label" className={classes.label}>
        Category Types
      </Box>
      <Select
        classes={{ select: classes.select }}
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={value.map((v) => items.find((item) => item.key === v))}
        onChange={onChange}
        input={<Input className={classes.outlined} />}
        renderValue={(selected) => {
          console.log(selected);
          return selected.map((s) => s.value).join(", ");
        }}
        MenuProps={MenuProps}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item}>
            <ListItemText primary={item.value} />
          </MenuItem>
        ))}
      </Select>
    </Fragment>
  );
};

export default MultiSelect;
