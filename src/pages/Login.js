import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import themeObject from "../util/theme";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import img from "../images/image.jpg";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { BackgroundColor } from "jest-matcher-utils/node_modules/chalk";

const useStyles = makeStyles(() => ({ ...themeObject }));

const Login = () => {
  const classes = useStyles();
  // console.log(classes);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserData({
      email,
      password,
    });
    // console.log("tried")
    // axios.post("/login", userData)
    // .then(res => {
    //     console.log("good")
    //     setLoading(false)
    //     history.push("/");
    // }).catch(err => {
    //     console.log("bad")
    //     //console.log(err);
    //     setErrors(err.response.data);
    //         setLoading(false)
    //         console.log(errors)
    // })
    
  };

  return (
    <Grid
      className={classes.form}
      container
      // direction="row"
      // justifyContent="center"
      // alignItems="center"
    >
      <Grid item sm>
        {/* <p>njisnvdi</p> */}
      </Grid>
      <Grid item sm>
        <img src={img} alt="icon" className={classes.image} />
        <Typography variant="h1" className={classes.pageTittle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            helperText={errors.email}
            error={errors.email ? true : false}
          ></TextField>

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            helperText={errors.password}
            error={errors.password ? true : false}
          ></TextField>

          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            varient="contained"
            type="submit"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            {loading && <CircularProgress className={classes.progress} />}
            Login
          </Button>
          <br />
          <small>
            {" "}
            Don't have an accout ? signup <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

Login.propTypes = {
  //classes: PropTypes.object.isRequired,
};

export default Login;
