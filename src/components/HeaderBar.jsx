import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Badge from "@material-ui/core/Badge";

import { NotificationsNoneOutlined, Search } from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    position: "fixed",
    zIndex: 99,
  },
  headerContainer: {
    backgroundColor: "#fff",
    borderRadius: 35,
    margin: "1rem 2rem",
    boxShadow:
      "0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important",
  },
  title: {
    letterSpacing: 2,
  },
  nakedInput: {
    "& .MuiInputBase-input::placeholder": {
      fontSize: 15,
      fontFamily: "Poppins",
      color: "#70709c",
    },
  },
  icon: {
    color: "#70709c",
  },
  divider: {
    border: ".5px solid #E8E8EF",
    height: 38,
    margin: "1rem",
  },
  badge: {
    backgroundColor: "#F2406D",
  },
}));

const HeaderBar = (props) => {
  const matches = useMediaQuery("(max-width:823px)");
  const matches2 = useMediaQuery("(max-width:473px)");
  const matches3 = useMediaQuery("(max-width:414px)");
  const matches4 = useMediaQuery("(max-width:375px)");
  const classes = useStyles();

  return (
    <Grid
      item
      {...props}
      container
      className={classes.root}
      style={{ ...props.style, paddingLeft: matches2 ? 0 : 83 }}
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        item
        className={classes.headerContainer}
        style={{ padding: matches4 ? "0 1rem" : "0 3rem" }}
      >
        <Grid item>
          <h2
            className={classes.title}
            style={{ display: matches ? "none" : "" }}
          >
            Oh My Food
          </h2>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Grid item container alignItems="center">
            <Grid item xs={7} sm={3}>
              <InputBase
                startAdornment={
                  <InputAdornment position="start">
                    <Search className={classes.icon} />
                  </InputAdornment>
                }
                className={classes.nakedInput}
                placeholder="Search Here"
                inputProps={{ "aria-label": "naked" }}
              />
            </Grid>
            <div className={classes.divider}></div>
            <Grid item>
              <IconButton>
                <Badge
                  classes={{
                    colorPrimary: classes.badge,
                  }}
                  color="primary"
                  variant="dot"
                  overlap="circle"
                >
                  <NotificationsNoneOutlined className={classes.icon} />
                </Badge>
              </IconButton>
            </Grid>
            <div style={{ flex: 1, display: matches3 ? "none" : "" }}></div>
            <Grid item style={{ display: matches3 ? "none" : "" }}>
              <div>Su</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderBar;
