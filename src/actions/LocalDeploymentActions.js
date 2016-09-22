import fetch from "isomorphic-fetch";

export const STARTING_STANDALONE = 'deployment/local/starting'
export const STARTED_STANDALONE = 'deployment/local/started'
export const STOPPING_STANDALONE = 'deployment/local/stopping'
export const STOPPED_STANDALONE = 'deployment/local/stopped'

const action = (type, status, serverInfo)=> {
    return serverInfo ? {
        type: type,
        serverInfo,
        status: status,
    } : {
        type: type,
        status: status,
    }
}

const sendRequest = (action)=> {
    return dispatch => {
        return fetch(`/api/events?_action${action}`)
            .then(response => response.json())
            .then(json => dispatch(action === 'start' ? startedStandalone(json) : stoppedStandalone(json)))
    }
}

export function startedStandalone(serverInfo) {
    return action(STARTED_STANDALONE, 'Started')
}

export function startingStandalone() {
    return action(STARTING_STANDALONE, 'Starting')
}
export function stoppedStandalone(serverInfo) {
    return action(STOPPED_STANDALONE, 'Stopped')
}

export function stoppingStandalone() {
    return action(STOPPING_STANDALONE, 'Stopping')
}

export default function performAction(action) {
    return (dispatch, getState) => {
        console.log('performAction', action)
        return dispatch(sendRequest(action))
    }
}