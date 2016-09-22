import { combineReducers } from 'redux'
import {reducer as reduxFormReducer} from 'redux-form'
import localDeployment from './xLocalDeployment'

export default combineReducers({
    localDeployment,
    form: reduxFormReducer,
})