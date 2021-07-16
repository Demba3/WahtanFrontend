import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import themeObject from "../util/theme";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import img from "../images/image.jpg";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({ ...themeObject }));

const Signup = () => {
  const classes = useStyles();
  // console.log(classes);
  const [handle, setHandle] = useState("");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserData({
      email,
      password,
      confirmPassword,
      handle
    });
    try {
      //console.log("tried")
      const res = await axios.post("/signup", userData);
      setLoading(false);
      localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
      history.push("/");
    } catch (err) {
      setErrors(err.response.data);
      setLoading(false);
      console.log(errors);
    }
  };

  return (
    <Grid className={classes.form} container>
      <Grid item sm>
        {/* <p>njisnvdi</p> */}
      </Grid>
      <Grid item sm>
        <img src={img} alt="icon" className={classes.image} />
        <Typography variant="h1" className={classes.pageTittle}>
          Signup
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

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="confirmPassword"
            className={classes.textField}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            fullWidth
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          ></TextField>

          <TextField
            id="handle"
            name="handle"
            type="handle"
            label="handle"
            className={classes.textField}
            value={handle}
            onChange={(e) => {
              setHandle(e.target.value);
            }}
            fullWidth
            helperText={errors.handle}
            error={errors.handle ? true : false}
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
            Signup
          </Button>
          <br />
          <small>
            Already have an accout ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

export default Signup;
