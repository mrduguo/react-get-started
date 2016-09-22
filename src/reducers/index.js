import {combineReducers} from "redux";
import {reducer as reduxFormReducer} from "redux-form";
import localDeployment from "./localDeployment";

export default combineReducers({
    localDeployment,
    form: reduxFormReducer,
})