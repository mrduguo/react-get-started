import React, {Component, PropTypes} from "react"
import {Tabs, Tab} from "material-ui/Tabs"
import {connect} from "react-redux"
import RaisedButton from "material-ui/RaisedButton"
import CmdStart from "material-ui/svg-icons/av/play-arrow"
import CmdStop from "material-ui/svg-icons/av/stop"
import CircularProgress from "material-ui/CircularProgress"
import CSSModules from "react-css-modules"
import styles from "../Starter.scss"
import deploymentAction, {startingStandalone, stoppingStandalone} from "./../../../actions/LocalDeploymentActions"


let LocalDeployment = ({dispatch, status, platformHost})=> {
  if (status === 'Initialling') {
    dispatch(deploymentAction('query'));
  }

  const handleStart = () => {
    dispatch(startingStandalone());
    dispatch(deploymentAction('start'));
  };

  const handleStop = () => {
    dispatch(stoppingStandalone());
    dispatch(deploymentAction('stop'));
  };

  const result = ()=> {
    switch (status) {
      case "Stopped":
        return (<div>
          <h3>To run the platform at</h3>
          <div>http://{platformHost}</div>
        </div>);
      case "Started":
        return (<div>
          <h3>Platform Dashboard</h3>
          <div>
            <a href={'http://'+platformHost}>http://{platformHost}</a>
          </div>
        </div>);
      default:
        return (<div>
          <h3>{status} ...</h3>
          <div>
            <CircularProgress/>
          </div>
        </div>);
    }
  }
  const buildCmd = ()=> {
    return (<div>
      <div>docker run -d -p 80:8888\</div>
      <div>{'\u00a0\u00a0\u00a0\u00a0'}--name platform-cloud-stater\</div>
      <div>{'\u00a0\u00a0\u00a0\u00a0'}-v /data:/data\</div>
      <div>{'\u00a0\u00a0\u00a0\u00a0'}cloud-stater\</div>
      <div>{'\u00a0\u00a0\u00a0\u00a0'}--host={platformHost}</div>
      <div>{'\u00a0'}</div>
    </div>)
  }

  return (
    <Tabs>
      <Tab label="Click To Start">
        <div styleName="localTab">
          <div styleName="localResult">
            {result()}
          </div>
          <RaisedButton styleName="deploymentButton" onTouchTap={handleStart}
                        disabled={status!='Stopped'?true:false} primary={true}
                        label="Start" icon={<CmdStart/>}/>
          <RaisedButton styleName="deploymentButton" onTouchTap={handleStop}
                        disabled={status!='Started'?true:false} primary={true}
                        label="Stop" icon={<CmdStop/>}/>
        </div>
      </Tab>
      <Tab label="Show Command">
        <div styleName="localTab">
          <div styleName="localResult">
            <div styleName="code">
              {buildCmd()}
            </div>
          </div>
          <h4>Run the command to start the platform straight away</h4>
        </div>
      </Tab>
    </Tabs>
  );
}

const mapStateToProps = ({localDeployment:{status, serverInfo}})=> {
  return {
    status,
    serverInfo,
    platformHost: '192.168.99.100',
  }
}

export default connect(mapStateToProps)(CSSModules(LocalDeployment, styles))