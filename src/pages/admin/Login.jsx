import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FocusTextField from "../../components/FocusTextField";

import coverImage from "../../assets/images/ma-la-xiang-guo-10.jpg";

import { production } from "../../app.config.json";
import { AppContext } from "../../context/AppProvider";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
  coverImageContainer: {
    height: "100vh",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  controls: {
    backgroundColor: "#F3F5F9",
  },
  title: {
    color: "#41546B",
  },
  button: {
    textTransform: "capitalize",
    backgroundColor: "#FE9215",
    color: "#fff",
    borderRadius: 10,
    paddingLeft: "2rem",
    paddingRight: "2rem",
    "&:hover, &:active": { backgroundColor: "#FE9215" },
  },
}));

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useContext(AppContext);
  const [phone, setPhone] = useState("09404888722");
  const [password, setPassword] = useState("123456");
  const [phoneErr, setPhoneErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const classes = useStyles();
  const matches = useMediaQuery("(max-width:1024px)");

  const isValidate = () => {
    if (phone.length >= 9 && phone.length <= 11 && password.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const phoneHandler = (e) => {
    e.target.value = e.target.value.replace(/[a-zA-z]/g, "");
    const { value } = e.target;
    setPhone(value);
    if (value.length < 9 || value.length > 11) {
      setPhoneErr("Phone no must be between 9 and 11 characters!");
    } else {
      setPhoneErr("");
    }
  };

  const passwordHandler = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value.length === 0) {
      setPasswordErr("Password must not be empty!");
    } else {
      setPasswordErr("");
    }
  };

  const loginHandler = async () => {
    try {
      if (isValidate()) {
        const query = `
          query Login($phone: String!, $password: String!) {
            login(phone: $phone, password: $password) {
                token
                user {
                    _id
                    role
                }
            }
          }
        `;
        setLoading(true);
        const response = await fetch(production.gql_api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables: {
              phone,
              password,
            },
          }),
        }).then((res) => res.json());
        setLoading(false);
        if (response.data.login.user.role !== "admin") {
          const error = new Error("Unauthorized!");
          throw error;
        }
        localStorage.setItem("ohmyfood_token", response.data.login.token);
        history.push("/admin");
      }
    } catch (err) {
      if (loading) setLoading(false);
      alert(err.message);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        justify="center"
        alignItems="center"
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={7}
        className={classes.controls}
      >
        <Grid
          spacing={3}
          item
          container
          xs={10}
          md={4}
          direction="column"
          justify="center"
        >
          <Grid item>
            <h2 className={classes.title}>Login to Oh My Food Admin</h2>
          </Grid>
          <Grid item>
            <FocusTextField
              placeholder="Phone number"
              value={phone}
              onChange={phoneHandler}
              errorLabel={phoneErr}
            />
          </Grid>
          <Grid item>
            <FocusTextField
              type="password"
              placeholder="Password"
              value={password}
              onChange={passwordHandler}
              errorLabel={passwordErr}
            />
          </Grid>
          <Grid item container justify="flex-end">
            <Grid item>
              <Button
                size="large"
                variant="contained"
                className={classes.button}
                onClick={loginHandler}
                disabled={!isValidate() || loading}
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        style={{ display: matches ? "none" : "" }}
        item
        xs={12}
        md={5}
        className={classes.coverImageContainer}
      >
        <img src={coverImage} className={classes.coverImage} alt="" />
      </Grid>
    </Grid>
  );
};

export default Login;
