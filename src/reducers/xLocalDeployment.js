import {combineReducers} from 'redux'
import {
    STARTING_STANDALONE,
    STARTED_STANDALONE,
    STOPPING_STANDALONE,
    STOPPED_STANDALONE,
} from '../actions/LocalDeploymentActions'

export default (state = {status: 'Initialling'}, action) => {
    switch (action.type) {
        case STARTING_STANDALONE:
        case STARTED_STANDALONE:
        case STOPPED_STANDALONE:
        case STOPPING_STANDALONE:
            return {...state, status: action.status}
        default:
            return state
    }
}