
import React from 'react'

import {connect} from "react-redux";

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";


const AuthRoute = ({component: Component, authenticated, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => authenticated === true ? <Redirect to= "/"/> : <Component {...props} />}
        />
    )
}
function mapStateToProps(state){
   return {authenticated: state.user.authenticated}
}

export default connect(mapStateToProps)(AuthRoute);
