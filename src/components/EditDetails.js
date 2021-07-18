import { useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import themeObject from "../util/theme";
import { connect } from "react-redux";

import { editUserDetails } from '../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';

import MyButton from "../util/MyButton"


// Icons
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles(() => ({ ...themeObject }));

const EditDetails = ({editUserDetails, credentials}) => {
 
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [location, setLocation] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        credentials.bio ? setBio(credentials.bio) : setBio("")
        credentials.website ? setWebsite(credentials.website) : setWebsite("")
        credentials.location ? setLocation(credentials.location) : setLocation("")

    }, [open])

    const handleSubmit = () => {
        const userDetails = {
            bio, website, location
        }
        editUserDetails(userDetails);
        setOpen(false);
    }

    const classes = useStyles();
    return (
      <>
      {/* <Tooltip title="Edit details" placement="top">
          <IconButton onClick={() => {setOpen(true)}} className={classes.button}>
              <EditIcon color="primary"/>
          </IconButton>
      </Tooltip> */}
      <MyButton
          tip="Edit Details"
          onClick={() => {setOpen(true)}}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
      <Dialog open={open} onClose={() => {setOpen(false)}} fullWidth maxWidth="sm">
      <DialogTitle>Edit your details</DialogTitle>
      <DialogContent><form>
          <TextField 
            name="bio"
            type="text"
            label="bio"
            multiline
            rows="3"
            placeholder="a short bio about yourself"
            className={classes.textField}
            value={bio}
            onChange={(e) => {
                setBio(e.target.value);
              }}
            fullWidth
            />

        <TextField 
            name="location"
            type="text"
            label="location"
            placeholder="a short bio about yourself"
            className={classes.textField}
            value={location}
            onChange={(e) => {
                setLocation(e.target.value);
              }}
            fullWidth
            />

        <TextField 
            name="website"
            type="text"
            label="website"
            placeholder="Your professional/personal website"
            className={classes.textField}
            value={website}
            onChange={(e) => {
                setWebsite(e.target.value);
              }}
            fullWidth
            />
          </form></DialogContent>
          <DialogActions>
              <Button onClick={() => {setOpen(false)}} color="primary">
                  Cancle
              </Button>
              <Button onClick={handleSubmit} color="primary">
                  Save
              </Button>
          </DialogActions>
      </Dialog>
      </>
    )
}
function mapStateToProps(state){
    return {
      credentials: state.user.credentials,
    }
  }

  function mapDispatchToProps(dispatch){
    return{
      editUserDetails : (userData) => dispatch(editUserDetails(userData)),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(EditDetails)