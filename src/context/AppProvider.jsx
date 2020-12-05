import React, { createContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AppContext = createContext([]);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const AppProvider = ({ children }) => {
  const classes = useStyles();
  const value = useState(false);
  return (
    <AppContext.Provider value={value}>
      {children}
      <Backdrop className={classes.backdrop} open={value[0]}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
