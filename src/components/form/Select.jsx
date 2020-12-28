import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, Button, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => ({
  button: {
    fontSize: 12,
    borderRadius: 7,
    background: "#fff",
    textTransform: "lowercase",
  },
}));

const Select = ({ items, value, onChange }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (v) => {
    setAnchorEl(null);
    onChange(v);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        {value} <ExpandMoreIcon style={{ fontSize: 20 }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem
            value={item}
            onClick={handleChange.bind(this, item)}
            key={item}
          >
            {item} per page
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default Select;
