import { combineReducers } from 'redux'
import {
    STARTING_STANDALONE, STARTED_STANDALONE,
    STOPPING_STANDALONE, STOPPED_STANDALONE
} from '../actions/LocalDeploymentActions'


export default function localDeploymentReducer(state = { status: 'Unknown'}, action) {
    console.log('localDeploymentReducer',action);
    switch (action.type) {
        case STARTING_STANDALONE:
            console.log('STARTING_STANDALONE',state);
            return Object.assign({}, state, {
                status: action.status
            })
        default:
            return state
    }
}