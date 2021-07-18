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


//redux stuff
import { connect } from "react-redux";
import { signup } from "../redux/actions/userActions";



const useStyles = makeStyles(() => ({ ...themeObject }));

const Signup = ({signUp, UI: { loading, error }}) => {
  const classes = useStyles();
  // console.log(classes);
  const [handle, setHandle] = useState("");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData({
      email,
      password,
      confirmPassword,
      handle,
    });
    console.log(error)
    signUp(userData, history);
    console.log(error)
    if(error !== null && Object.keys(error).length !== 0){
      setErrors(error);
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
            value="Submit"
            color="primary"
            className={classes.button}
            disabled={loading}
            //onClick={() => {handleSubmit()}}
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

function mapStateToProps(state){
  return {
    user: state.user,
    UI: state.UI
  }
}
function mapDispatchToProps(dispatch){
  return{
    signUp : (userData, history) => dispatch(signup(userData, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
