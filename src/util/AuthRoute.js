
import React, { Component } from 'react'

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";


const AuthRoute = ({component: Component, authenticated, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => authenticated === true ? <Redirect to= "/"/> : <Component {...props} />}
        />
    )
}

export default AuthRoute
