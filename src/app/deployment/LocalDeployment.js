import React from "react"
import Dialog from "material-ui/Dialog"
import {Tabs, Tab} from "material-ui/Tabs"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import CloudLocal from "material-ui/svg-icons/file/cloud-download"
import CmdStart from "material-ui/svg-icons/av/play-arrow"
import CmdStop from "material-ui/svg-icons/av/stop"
import CircularProgress from "material-ui/CircularProgress"
import CSSModules from "react-css-modules"
import styles from "./Deployments.scss"


class LocalDeployment extends React.Component {
  state = {
    open: false,
    status: 'stopped',
    platformHost: '192.168.99.100',
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleStart = () => {
    this.setState({status: 'Starting'});
    var _this = this;
    setTimeout(function () {
      _this.setState({status: 'started'});
    }, 3000)
  };

  handleStop = () => {
    this.setState({status: 'Stopping'});
    var _this = this;
    setTimeout(function () {
      _this.setState({status: 'stopped'});
    }, 3000)
  };

  render () {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const result = ()=> {
      switch (this.state.status) {
        case "stopped":
          return (<div>
            <h3>To run the platform at</h3>
            <div>http://{this.state.platformHost}</div>
          </div>);
        case "started":
          return (<div>
            <h3>Platform Dashboard</h3>
            <div>
              <a href={'http://'+this.state.platformHost}>http://{this.state.platformHost}</a>
            </div>
          </div>);
        default:
          return (<div>
            <h3>{this.state.status} ...</h3>
            <div>
              <CircularProgress/>
            </div>
          </div>);
      }
    }
    const buildCmd = ()=> {
      return (<div>
        <div>docker run -d -p 80:8888</div>
        <div>{'\u00a0\u00a0\u00a0\u00a0'}--name platform-cloud-stater</div>
        <div>{'\u00a0\u00a0\u00a0\u00a0'}-v /data:/data</div>
        <div>{'\u00a0\u00a0\u00a0\u00a0'}cloud-stater</div>
        <div>{'\u00a0\u00a0\u00a0\u00a0'}--host={this.state.platformHost}</div>
        <div>{'\u00a0'}</div>
      </div>)
    }

    return (
      <div>
        <div styleName="gridContent">
          <div>
            Start the cloud platform on any <b>docker</b> environment to have fun.
          </div>
          <div styleName="gridRequirements">
            <h4>Requirements</h4>
            <ul>
              <li>4GB available memory</li>
              <li>10GB free disk space</li>
            </ul>
          </div>
          <RaisedButton primary={true} fullWidth={true} label="Run" onTouchTap={this.handleOpen}
                        icon={<CloudLocal/>}/>
        </div>
        <Dialog
          title="Deploy To Local Standalone"
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <Tabs>
            <Tab label="One Click To Start">
              <div styleName="localTab">
                <div styleName="localResult">
                  {result()}
                </div>
                <RaisedButton styleName="deploymentButton" onTouchTap={this.handleStart}
                              disabled={this.state.status!='stopped'?true:false} primary={true}
                              label="Start" icon={<CmdStart/>}/>
                <RaisedButton styleName="deploymentButton" onTouchTap={this.handleStop}
                              disabled={this.state.status!='started'?true:false} primary={true}
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
        </Dialog>
      </div>
    );
  }
}


export default CSSModules(LocalDeployment, styles);