import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import AppDrawer from "../components/AppDrawer";
import HeaderBar from "../components/HeaderBar";

import { ArrowForwardIosOutlined } from "@material-ui/icons";

import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    // paddingTop: "6.5rem",
  },
  fab: {
    transition: "all 0.3s",
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#70709c",
    color: "#fff",
    "&:hover": { backgroundColor: "#70709c" },
  },
  icon: {
    transition: "all 0.3s",
  },
}));

const AppContainer = ({ routes }) => {
  const matches = useMediaQuery("(max-width:473px)");
  const location = useLocation();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!(location.pathname.indexOf("/admin/login") !== -1 || matches)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location, matches]);

  const showHideStyle = {
    display: location.pathname.indexOf("/admin/login") !== -1 ? "none" : "",
  };

  return (
    <Grid container>
      <AppDrawer
        style={{
          width: open ? 83 : 0,
          position: matches ? "absolute" : "static",
        }}
      />
      <Fab
        style={{
          transform:
            !matches || location.pathname.indexOf("/admin/login") !== -1
              ? "scale(0)"
              : "scale(1)",
        }}
        aria-label="expand"
        className={classes.fab}
        onClick={() => setOpen((v) => !v)}
      >
        <ArrowForwardIosOutlined
          className={classes.icon}
          style={{ transform: !open ? "rotate(-180deg)" : "rotate(0deg)" }}
        />
      </Fab>
      <HeaderBar style={showHideStyle} />
      <Grid item className={classes.container}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
        </Switch>
      </Grid>
    </Grid>
  );
};

export default AppContainer;
