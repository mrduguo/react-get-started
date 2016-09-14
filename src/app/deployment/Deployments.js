import React, {Component} from "react"
import Paper from "material-ui/Paper"
import CSSModules from "react-css-modules"
import styles from "./Deployments.scss"


const Deployments = () => (
  <div>
    <h1 styleName="heading">Please choose a deployment topology<br/>to get your cloud environment started</h1>
    <div styleName="grid">
      <Paper zDepth={3} styleName="deployment">
        a
      </Paper>
      <Paper zDepth={3} styleName="deployment">
        b
      </Paper>
    </div>
  </div>
)

export default CSSModules(Deployments, styles);

