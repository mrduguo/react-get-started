import React, {Component} from "react"
import CSSModules from "react-css-modules"
import Header from "./layout/Header"
import Deployment from "./deployment"
import styles from "./App.scss"


const Content = CSSModules(() => (
  <div styleName='content'>
    <Deployment/>
  </div>
), styles);


class App extends Component {
  render () {
    return (
        <div>
          <Header/>
          <Content/>
        </div>
    );
  }
}

export default App;
