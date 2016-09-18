import React, {Component} from "react"
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import {deepOrange500} from "material-ui/styles/colors"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import CSSModules from "react-css-modules"
import Header from "./layout/Header"
import Deployments from "./deployment/Deployments"
import styles from "./App.scss"

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)

window.store=store;


const Content = CSSModules(() => (
  <div styleName='content'>
    <Deployments/>
  </div>
), styles);

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Header/>
            <Content/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
