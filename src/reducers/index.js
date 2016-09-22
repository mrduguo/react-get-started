import {combineReducers} from "redux";
import {reducer as reduxFormReducer} from "redux-form";
import { routerReducer } from 'react-router-redux'
import localDeployment from "./localDeployment";

export default combineReducers({
    localDeployment,
    form: reduxFormReducer,
    routing: routerReducer,
})