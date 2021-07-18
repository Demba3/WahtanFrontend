import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import themeObject from "../util/theme";
import { makeStyles } from "@material-ui/core/styles";
import img from "../images/image.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";


const useStyles = makeStyles(() => ({...themeObject }));

const Login = ({login, UI: { loading, error }}) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

 
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserData({
      email,
      password,
    });
    login(userData, history);
    //console.log("sgr",error)
    if(error !== null && Object.keys(error).length !== 0){
      setErrors(error);
      }

  };

  return (
    <Grid className={classes.form} container>
      <Grid item sm></Grid>
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
            // onClick={() => {handleSubmit()}}
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
function mapStateToProps(state){
  return {
    user: state.user,
    UI: state.UI
  }
}
function mapDispatchToProps(dispatch){
  return{
    login : (userData, history) => dispatch(loginUser(userData, history)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
