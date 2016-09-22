import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {deepOrange500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import thunkMiddleware from "redux-thunk";
import App from "./views/App";
import reducer from "./reducers";


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Enable log in none debug environments
const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== `production`) {
    const createLogger = require(`redux-logger`);
    const logger = createLogger({collapsed:true});
    middlewares.push(logger);
}

const store =
    (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)
    (reducer, applyMiddleware(...middlewares))

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});


// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
