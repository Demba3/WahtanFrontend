import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import themeObject from "../util/theme";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uploadImage, loginUser, logoutUser } from "../redux/actions/userActions";
import dayjs from "dayjs";
import EditDetails from "./EditDetails"
// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import MyButton from "../util/MyButton";

const useStyles = makeStyles(() => ({ ...themeObject }));

const Profile = ({
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
  logOut,
  upLoadImage,
}) => {
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    upLoadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleLogout = () => {
    logOut();
  }
  const classes = useStyles();

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-wrapper">
            <img src={imageUrl} alt="profile" className={"profile-image"} />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />

              <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target=" blank" rel="noopener noreferrer">
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined{dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <div style={{float:"right"}}><EditDetails/></div>
          <MyButton 
          onClick={handleLogout}
          tip={"Logout"}
          >
          <KeyboardReturn color="primary"/>
          </MyButton>
          
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body1" align="center">
          No profile found please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>

          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p> Loading.....</p>
  );

  return profileMarkup;
};

function mapStateToProps(state) {
  return { user: state.user };
}
function mapDispatchToProps(dispatch) {
  return {
    logOut : (userData, history) => dispatch(logoutUser(userData, history)),
    upLoadImage: (formData) => dispatch(uploadImage(formData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
