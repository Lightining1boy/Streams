import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
    auth: authReducer,
    form: form,
    streams: streamReducer
})