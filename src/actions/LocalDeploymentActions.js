import fetch from 'isomorphic-fetch'

export const STARTING_STANDALONE = 'deployment/local/starting'
export const STARTED_STANDALONE = 'deployment/local/started'
export const STOPPING_STANDALONE = 'deployment/local/stopping'
export const STOPPED_STANDALONE = 'deployment/local/stopped'

export function startedStandalone(serverInfo) {
    return {
        type: STARTED_STANDALONE,
        serverInfo,
        status: 'Started',
    }
}


export function startingStandalone() {
    return {
        type: STARTING_STANDALONE,
        status: 'Starting',
    }
}
export function stoppedStandalone(serverInfo) {
    return {
        type: STOPPED_STANDALONE,
        status: 'Stopped',
        serverInfo,
        receivedAt: Date.now(),
    }
}

export function stoppingStandalone() {
    return {
        type: STOPPING_STANDALONE,
        status: 'Stopping',
    }
}

function sendRequest(action) {
    return dispatch => {
        return fetch(`/api/events?_action${action}`)
            .then(response => response.json())
            .then(json => dispatch(action === 'stopped' ? stoppedStandalone(json) : startedStandalone(json)))
    }
}

export default function performAction(action) {
    return (dispatch, getState) => {
        console.log('performAction', action)
        return dispatch(sendRequest(action))
    }
}