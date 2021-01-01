import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  picker: {
    "& .MuiInputBase-root": {
      borderRadius: 10,
      fontSize: 12,
    },
    "& .MuiOutlinedInput-input": {
      padding: ".85rem .9rem !important",
      "&:focus": {
        borderColor: "#3696f8!important",
      },
    },
  },
  label: {
    fontSize: 13,
    lineHeight: 2,
  },
}));

const TimePicker = ({ value, onChange, label }) => {
  const classes = useStyles();

  const Label = () =>
    label ? <Box className={classes.label}>{label}</Box> : null;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Label />
      <KeyboardTimePicker
        className={classes.picker}
        inputVariant="outlined"
        variant="inline"
        margin="none"
        id="time-picker"
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          "aria-label": "change time",
          size: "small",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TimePicker;
