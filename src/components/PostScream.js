import { useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import themeObject from "../util/theme";
import { connect } from "react-redux";

import { postScream } from '../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from "../util/MyButton"
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"

// Icons
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles(() => ({ 
...themeObject,
submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  } 
}));

const PostScream = ({PostScream, Ui: {error, loading}}) => {
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState({});
    const [errors, setErrors] = useState({});

    const classes = useStyles();
    const handleSubmit = (e) => {
        const newUser = {
            body
        }
        if(error !== null && Object.keys(error).length !== 0){
            setErrors(error);
            }
    }
    return (
       <>
       <MyButton onClick={()=> {setOpen(true)}} tip="post a scream">
           <AddIcon/>
       </MyButton>
       <Dialog open={open} onClose={()=>{setOpen(false)}} fullWidht maxWidth="sm">
           <MyButton tip="close" onClick={() => {setOpen(false)}}>
                <CloseIcon/>
           </MyButton>
           <DialogTitle>Add Post</DialogTitle>
           <DialogContent>
               <form onSubmit={handleSubmit}>
                   <TextField
                   name="body"
                   type="text"
                   label="Scream"
                   multiline
                   rows="3"
                   placeholder="Speack your mind"
                   error={errors.body ? true: false}
                   helperText={errors.body}
                   className={classes.textField}
                   onChange={(e) => {setBody(e.target.value)}}
                   />
                   <Button 
                   variant="contained"
                    type="submit"
                     color="primary" 
                     className={classes.submitButton}
                     disabled={loading}
                     >
                         Submit
                         {loading && <CircularProgress size={30} className={classes.progessSpinner}/>}
                     </Button>
               </form>
           </DialogContent>
       </Dialog>
       </>
    )
}
function mapStateToProps(state){
   return{
    UI: state.UI
   } 
}
const mapDispatchToProps = (dispatch) => {
    return{PostScream: (newScream)=>{dispatch(postScream(newScream))}}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostScream)
