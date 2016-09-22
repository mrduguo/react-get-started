import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./Deployment.scss";
import TopologyBox from "./TopologyBox";
import LocalDeployment from "./local/LocalDeployment";
import RemoteDeployment from "./remote/RemoteDeployment";
import CloudLocal from "material-ui/svg-icons/file/cloud-download";
import CloudRemote from "material-ui/svg-icons/file/cloud-circle";


const Deployment = ({topology}) => (
    <div>
        <h1 styleName="heading">Please choose a deployment topology<br/>to get your cloud environment started</h1>
        <div styleName="grid">
            <TopologyBox
                heading="Local Standalone"
                path="/standalone"
                img="images/css-framework.svg"
                description={(<div>Start the cloud platform on any <b>docker</b> environment to have fun.</div>)}
                requirements={['4GB available memory','10GB free disk space']}
                actionTitle="Run"
                actionIcon={<CloudLocal/>}
                open={topology=='standalone'}
            >
                <LocalDeployment/>
            </TopologyBox>
            <TopologyBox
                heading="Remote Cluster"
                path="/cluster"
                img="images/css-framework.svg"
                description={(<div>Deploy the platform via <b>ansible</b> to one or more linux based clusters.</div>)}
                requirements={['ssh access','python']}
                actionTitle="Configure"
                actionIcon={<CloudRemote/>}
                open={topology=='cluster'}
            >
                <RemoteDeployment/>
            </TopologyBox>
        </div>
    </div>
)

export default CSSModules(Deployment, styles);

