import React, {Component} from "react"
import Paper from "material-ui/Paper"
import CSSModules from "react-css-modules"
import styles from "./Deployments.scss"
import TopologyBox from "./TopologyBox"
import LocalDeployment from "./LocalDeployment"
import RemoteDeployment from "./RemoteDeployment"


const Deployments = () => (
  <div>
    <h1 styleName="heading">Please choose a deployment topology<br/>to get your cloud environment started</h1>
    <div styleName="grid">
        <TopologyBox
            heading="Local Standalone"
            route="/standalone"
            img="images/css-framework.svg"
        >
            <LocalDeployment/>
        </TopologyBox>
        <TopologyBox
            heading="Remote Cluster"
            route="/cluster"
            img="images/css-framework.svg"
        >
            <RemoteDeployment/>
        </TopologyBox>
    </div>
  </div>
)

export default CSSModules(Deployments, styles);

