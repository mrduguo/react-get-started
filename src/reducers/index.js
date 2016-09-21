import { combineReducers } from 'redux'
import {reducer as reduxFormReducer} from 'redux-form'
import localDeploymentReducer from './localDeploymentReducers'

export default combineReducers({
    localDeploymentReducer,
    form: reduxFormReducer,
})