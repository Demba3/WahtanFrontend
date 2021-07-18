import React from 'react'
import { connect } from "react-redux";
import {getScreams, likeScream, unlikeScream} from "../redux/actions/dataActions"

import DeleteScream from "./DeleteScream.js"

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MyButton from "../util/MyButton";
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";


import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

const Link = require("react-router-dom").Link;

const useStyles = makeStyles(() => ({
    card:{
        display: "flex",
        marginBottom: 20,
    },
    image:{
        minWidth: 200
    },
    content:{
        padding: 25,
        objectFit: "cover",
    }
} )) 
//, screamId, likeCount, commentCount 
const Scream = ({ user:{likes, authenticated, credentials: {handle}}, body, createdAt, userImage, userHandle, likeCount, commentCount, screamId, LikeScream, UnlikeScream}) => {
    dayjs.extend(relativeTime);
    const  classes  = useStyles() 

    const likedScream = () => {      
    if(likes && likes.find(like => like.screamId === screamId)){
        return true;
    }
    return false;
    }

    const likeScream = () => {
        console.log("like")
        LikeScream(screamId);
    } 
    const unlikeScream = () => {
        console.log("unlike")

        UnlikeScream(screamId);
    }

    const likeButton = !authenticated ? (
    <>
    <MyButton tip="Like">
        <Link to="/login">
           <FavoriteBorder color="primary"/>
        </Link>
    </MyButton>
    </>
    ) : (
        likedScream() ? 
        ( 
           
        <>
        <MyButton tip="undo like" onClick={unlikeScream} >
            <FavoriteBorder color="secondary"/>
        </MyButton>
        </>) : 
        ( 
        <>
        <MyButton tip="like" onClick={likeScream} >
            <FavoriteBorder color="primary"/>
        </MyButton>
        </>)
    )





    const deleteButton = authenticated && userHandle === handle? (
        <>
        <DeleteScream screamId={screamId} />
        </>
        ) : (
            null
        )






    return (
     <Card className={classes.card}>
         <CardMedia className= {classes.image}
         image={userImage}
         title="Profile image"
         />
         <CardContent className={classes.content}>
             <Typography variant="h5" component={Link} to={`user/${userHandle}`}>
                 {userHandle}
             </Typography>
             {deleteButton}
             <Typography variant="body2" color="textSecondary">
                 {dayjs(createdAt).fromNow()}
             </Typography>
             <Typography variant="body1" color="textSecondary">
                 {body}
             </Typography>

             {likeButton}
             <span>{likeCount} Likes</span>
             <MyButton tip="comments">
                 <ChatIcon color="primary" />
             </MyButton>
             <span>{commentCount} comments</span>


         </CardContent>
     </Card>
    )
}

const mapStateToProps = (state) =>{
    return{
        user: state.user
    }
}
function mapDispatchToProps (dispatch){
    return{ 
        getAllScreams: () => dispatch(getScreams()),
        UnlikeScream: (id) => dispatch(unlikeScream(id)),
        LikeScream: (id) => dispatch(likeScream(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
