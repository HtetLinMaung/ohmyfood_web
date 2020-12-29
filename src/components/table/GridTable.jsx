import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    overflowX: "auto",
  },
  headerGrid: {
    flex: 1,
    fontSize: 14,
    cursor: "pointer",
  },
  noGrid: {
    fontSize: 14,
    cursor: "pointer",
    flexBasis: 30,
  },
  headerGridRow: {
    padding: "0 1.9rem",
  },
  gridRow: {
    fontSize: 12,
    padding: "1.5rem 1rem",
    margin: "1rem",
  },
}));

const GridTable = ({ headers, items, children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.headerGridRow}
      >
        <Grid item className={classes.noGrid}>
          #
        </Grid>
        {headers.map((header, index) => (
          <Grid
            item
            className={classes.headerGrid}
            key={`grid_table__header__${index}`}
          >
            {header.text}
          </Grid>
        ))}
      </Grid>
      {items.map((item, index) => (
        <Card
          raised
          className={classes.gridRow}
          key={`grid_table__body__${index}`}
        >
          <Grid container spacing={1}>
            <Grid item className={classes.noGrid} style={{ fontSize: 12 }}>
              {index + 1}
            </Grid>
            {children({ item, index })}
          </Grid>
        </Card>
      ))}
    </Box>
  );
};

export default GridTable;
