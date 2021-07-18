import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
  } from '../types';
  import axios from 'axios';


  export const loginUser = (userData, history) =>  (dispatch) => {
      dispatch({type: LOADING_UI});
      axios.post("/login", userData)
      .then(res => {
          console.log(res.data)
          const FBIdToken = `Bearer ${res.data.token}`;
          localStorage.setItem("FBIdToken",FBIdToken);
          axios.defaults.headers.common['Authorization'] = FBIdToken;
          dispatch(getUserData());
          dispatch({type: CLEAR_ERRORS
      });
          history.push("/")
      }).catch(err => {
          dispatch({type: SET_ERRORS, payload: err.response.data})
          console.log(err)
      })
  }

  export const getUserData = () => (dispatch) => {
      dispatch({type: LOADING_USER});
      axios.get("/user").then(res => {
          dispatch({type: SET_USER, payload: res.data})
      }).catch(err => {
          console.log(err);
      })
  }

  
  export const signup = (newUserData, history) =>  (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post("/signup", newUserData)
    .then(res => {
        console.log(res.data)
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem("FBIdToken",FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS
    });
        history.push("/")
    }).catch(err => {
        dispatch({type: SET_ERRORS, payload: err.response.data})
        console.log(err)
    })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("FBIdToken")
    delete axios.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED })
}

// const setAauthorizationHeader = () => {

// }

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post("/user", userDetails)
    .then(() => {
        dispatch(getUserData())
    }).catch(err => {
        console.log(err)
    })
}
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post("/user/image", formData)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => {
        console.log(err)
    })
}