/* eslint-disable import/no-anonymous-default-export */

import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI
  } from '../types';
  
  const initialState = {
    loading: false,
    error: null
  };

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: 
            return{
                ...state,
                loading: false,
                error: null
            }
        case LOADING_UI:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}