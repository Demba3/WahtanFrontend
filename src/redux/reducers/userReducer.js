/* eslint-disable import/no-anonymous-default-export */
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
    LIKE_SCREAM,
    UNLIKE_SCREAM
  } from '../types';

  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
  };

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            }

        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return{
                authenticated: true,
                loading: false,
                ...action.payload
            }
            case LOADING_USER:
                return{
                    ...state,
                    loading: true
                }
        case LIKE_SCREAM:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return{
                ...state,
                likes: state.likes.filter((like) => like.screamId !== action.payload.screamId)
            }
        default:
            return state;
    }
}