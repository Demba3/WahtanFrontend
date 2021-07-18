import { useState } from "react";
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions"


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline  from '@material-ui/icons/DeleteOutlined';
import MyButton from "../util/MyButton"
import { makeStyles } from '@material-ui/core/styles';
import themeObject from "../util/theme"

const useStyles = makeStyles(() => ({...themeObject }));

// const useStyles = makeStyles ( () => {
//     return{...themeObject}
// })
const DeleteScream = ({DeleteScream, screamId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    const deleteScream = ()=>{
        DeleteScream(screamId);
     setIsOpen(false);    
 }

    return (
        <>
            <MyButton 
            tip="Delete Scream" 
            onClick={()=>{setIsOpen(true)}}
            btnClassName={classes.btn}
            >
                <DeleteOutline color="secondary" />
            </MyButton>

            <Dialog 
            open={isOpen}
            onClose={() => {setIsOpen(false)}}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => {setIsOpen(false)}}
                    color="primary">
                        Cancel
                    </Button>
                    <Button 
                    onClick={deleteScream}
                    color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


  function mapDispatchToProps(dispatch){
    return{//deleteScream
      DeleteScream : (id) => dispatch(deleteScream(id)),
    }
  }

export default connect(null, mapDispatchToProps)(DeleteScream)
