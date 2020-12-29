import React, { createContext, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AppContext = createContext([]);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: action.payload };
    case "TOKEN":
      return { ...state, token: action.payload };
    case "SET_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const classes = useStyles();
  const value = useReducer(reducer, {
    loading: false,
    token: "",
  });

  return (
    <AppContext.Provider value={value}>
      {children}
      <Backdrop className={classes.backdrop} open={value[0].loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
