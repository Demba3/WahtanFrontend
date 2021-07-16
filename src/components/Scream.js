import React from 'react'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

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
const Scream = ({ body, createdAt, userImage, userHandle}) => {
    dayjs.extend(relativeTime);
    const  classes  = useStyles() 
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
             <Typography variant="body2" color="textSecondary">
                 {dayjs(createdAt).fromNow()}
             </Typography>
             <Typography variant="body1" color="textSecondary">
                 {body}
             </Typography>
         </CardContent>
     </Card>
    )
}

export default Scream;
