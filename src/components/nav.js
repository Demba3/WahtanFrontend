import React from 'react'
import { connect } from "react-redux";
//MUI stuff

import MyButton from "../util/MyButton"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

import Add from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "@material-ui/icons/Notifications"

//import Link from "react-router-dom/Link";
const Link = require("react-router-dom").Link;


const nav = ({authenticated}) => {
    return (
        <AppBar>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <>
                    <MyButton tip="Post a Scream!">
                        <Add 
                        color="primary"/>
                    </MyButton>
                    <Link to="/">
                    <MyButton tip="Home">
                        <HomeIcon 
                        color="primary"/>
                    </MyButton>
                    <MyButton tip="Notification">
                        <Notifications 
                        color="primary"/>
                    </MyButton>
                    </Link>

                    </>
                ) : (
                    <>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </>
                )}
            </Toolbar>

        </AppBar>
    )
}

function mapStateToProps(state) {
    return { authenticated: state.user.authenticated };
  }
export default connect(mapStateToProps)(nav)
