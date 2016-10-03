import {combineReducers, createStore, applyMiddleware} from "redux"
import {reducer as reduxFormReducer} from "redux-form"
import thunkMiddleware from "redux-thunk"
import {routerReducer, syncHistoryWithStore} from "react-router-redux"
import {hashHistory} from "react-router"
import localDeployment from "./localDeployment"

const reducer = combineReducers({
  localDeployment,
  form: reduxFormReducer,
  routing: routerReducer,
})


// Enable log in none debug environments
const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== `production`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger({collapsed: true});
  middlewares.push(logger)
}

export const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)
  (reducer, applyMiddleware(...middlewares));

export const history = syncHistoryWithStore(hashHistory, store);
