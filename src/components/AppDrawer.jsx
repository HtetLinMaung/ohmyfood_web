import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

import { HomeOutlined, CategoryOutlined } from "@material-ui/icons";

import setting from "../assets/images/menu.png";

const useStyles = makeStyles(() => ({
  root: {
    left: 0,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#F2F4F7",
    transition: "all 0.3s",
    zIndex: 9
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#F2F4F7"
    },
    transition: "all 0.3s"
  },
  settingContainer: {
    transition: "all 0.3s",
    marginBottom: "2.2rem"
  },
  icon: {
    color: "#70709c",
    transition: "all 0.3s"
  },
  selectedIcon: {
    transition: "all 0.3s",
    color: "#fff"
  },
  selectedIconButton: {
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#3596F8"
    }
  },
  selected: {
    transition: "all 0.3s",
    backgroundColor: "#3596F8",
    borderRadius: 15,
    boxShadow:
      "0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important"
  },
  menuContainer: {
    transition: "all 0.3s",
    marginBottom: "1rem"
  }
}));

const menus = [
  {
    IconComponent: HomeOutlined,
    pathname: "/admin"
  },
  {
    IconComponent: CategoryOutlined,
    pathname: "/admin/categories"
  }
];

const normilizePath = (location) => {
  const pathArray = location.pathname.split("/");
  const newPathArray = [];
  pathArray.forEach((v) => {
    if (v) {
      newPathArray.push(v);
    }
  });
  return "/" + newPathArray.join("/");
};

const AppDrawer = (props) => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  location.pathname = normilizePath(location);

  return (
    <Grid
      container
      item
      wrap="nowrap"
      direction="column"
      {...props}
      className={classes.root}
    >
      <Grid
        item
        container
        justify="center"
        className={classes.settingContainer}
      >
        <Grid item>
          <IconButton className={classes.iconButton}>
            <Avatar alt="" src={setting} />
          </IconButton>
        </Grid>
      </Grid>
      {menus.map((menu) => (
        <Grid
          item
          container
          justify="center"
          key={menu.pathname}
          className={classes.menuContainer}
        >
          <Grid
            item
            className={clsx({
              [classes.selected]: menu.pathname === location.pathname
            })}
          >
            <IconButton
              onClick={() => history.push(menu.pathname)}
              className={clsx(classes.iconButton, {
                [classes.selectedIconButton]:
                  menu.pathname === location.pathname
              })}
            >
              <menu.IconComponent
                className={clsx(classes.icon, {
                  [classes.selectedIcon]: menu.pathname === location.pathname
                })}
              />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppDrawer;
