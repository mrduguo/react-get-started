import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CloudLocal from 'material-ui/svg-icons/file/cloud-download';
import CmdStart from 'material-ui/svg-icons/av/play-arrow';
import CmdStop from 'material-ui/svg-icons/av/stop';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';
import CSSModules from "react-css-modules"
import styles from "./Deployments.scss"


class LocalDeployment extends React.Component {
    state = {
        open: false,
        status: 'stopped',
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleStart = () => {
        this.setState({status: 'running'});
        var _this=this;
        setTimeout(function(){
            _this.setState({status: 'started'});
        },3000)
    };

    handleStop = () => {
        this.setState({status: 'running'});
        var _this=this;
        setTimeout(function(){
            _this.setState({status: 'stopped'});
        },3000)
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                keyboardFocused={true}
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];
        const loadingStatus = ()=>{
            if(this.state.status=='running'){
                return <CircularProgress styleName="deploymentInProgress"/>
            }
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
                    title="Local Standalone"
                    actions={actions}
                    modal={false}
                    onRequestClose={this.handleClose}
                    open={this.state.open}
                >
                    <Tabs>
                        <Tab label="One Click To Start">
                            <div>
                                <h2>Tab One</h2>
                                <p>
                                    {loadingStatus()}
                                    192.168.99.100<br/>
                                    This is an example tab.<br/>
                                    This is an example tab.<br/>
                                    This is an example tab.<br/>
                                    This is an example tab.<br/>
                                </p>
                                <p>
                                    This is an example tab.1
                                </p>
                                <p>
                                    <RaisedButton styleName="deploymentButton"  onTouchTap={this.handleStart}
                                                  disabled={this.state.status!='stopped'?true:false} primary={true}
                                                  label="Start" icon={<CmdStart/>}/>
                                    <RaisedButton styleName="deploymentButton"  onTouchTap={this.handleStop}
                                                  disabled={this.state.status!='started'?true:false} primary={true}
                                                  label="Stop" icon={<CmdStop/>}/>
                                </p>
                            </div>
                        </Tab>
                        <Tab label="Show Command">
                            <div>
                                <h2>Tab Two</h2>
                                <p>
                                    This is another example tab.
                                </p>
                            </div>
                        </Tab>
                    </Tabs>
                </Dialog>
            </div>
        );
    }
}


export default CSSModules(LocalDeployment, styles);