
import './App.css';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles'

import themeObject from "./util/theme"
import AuthRoute from "./util/AuthRoute"

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import jwtDecode from "jwt-decode"

import home from "./pages/Home";
import login from "./pages/Login";
import signup from "./pages/Signup"

import NavBar from "./components/nav"

import {Provider} from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

const token = localStorage.FBIdToken;
let authenticated;
if(token){
  const decodedToken = jwtDecode(token);
 // console.log(decodedToken);
 if(decodedToken.exp * 1000 < Date.now()){
   window.location.href = "/login"
   store.dispatch(logoutUser())
 }else{
  store.dispatch({type: SET_AUTHENTICATED})
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getUserData())

}
}

const theme = createTheme({...themeObject})

function App() {
  return (
   <MuiThemeProvider theme= {theme}>
     <Provider store={store}>

     <Router>
      <NavBar/>
      <div className="container">
      <Switch>
         <Route exact path="/" component={home}/>
         <AuthRoute  exact path="/login" component={login} authenticated={authenticated}/>
           
         <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
       </Switch>
      </div>
      
     </Router>

     </Provider>
     
   </MuiThemeProvider>
  );
}

export default App;
