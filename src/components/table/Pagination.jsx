import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, IconButton, Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(() => ({
  root: {},
  iconButton: {
    background: "#fff",
    padding: "0.5rem",
  },
  card: {
    transition: "all 0.3s",
    cursor: "pointer",
    width: 31,
    height: 29.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
    borderRadius: 7,
  },
}));

const range = (start = 1, end) => {
  const numbers = [];
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
};

const Pagination = ({ count, page, onPageChange }) => {
  const classes = useStyles();

  const PageList = () =>
    count > 7
      ? null
      : range(1, count).map((n) => (
          <Grid item>
            <Card
              onClick={() => onPageChange(n)}
              className={classes.card}
              style={{
                background: page === n ? "black" : "#fff",
              }}
            >
              <Button style={{ color: page === n ? "#fff" : "black" }}>
                {n}
              </Button>
            </Card>
          </Grid>
        ));

  return (
    <Grid container spacing={1} className={classes.root} justify="center">
      <Grid item>
        <IconButton
          size="small"
          aria-label="prev"
          className={classes.iconButton}
        >
          <ArrowBackIosIcon
            className={classes.nextPrevIcon}
            style={{ fontSize: 12 }}
          />
        </IconButton>
      </Grid>
      <PageList />
      <Grid item>
        <IconButton
          size="small"
          aria-label="next"
          className={classes.iconButton}
        >
          <ArrowForwardIosIcon
            className={classes.nextPrevIcon}
            style={{ fontSize: 12 }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Pagination;
