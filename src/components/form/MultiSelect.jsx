import React, { Fragment } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";

const MultiSelect = ({ items, onChange, value = [] }) => {
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
      <InputLabel id="demo-mutiple-checkbox-label">Category Types</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={value}
        onChange={onChange}
        input={<Input />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            <Checkbox checked={items.indexOf(item.value) > -1} />
            <ListItemText primary={item.value} />
          </MenuItem>
        ))}
      </Select>
    </Fragment>
  );
};

export default MultiSelect;
