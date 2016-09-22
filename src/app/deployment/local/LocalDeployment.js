import React, { Component, PropTypes } from "react"
import {Tabs, Tab} from "material-ui/Tabs"
import {connect } from 'react-redux'
import RaisedButton from "material-ui/RaisedButton"
import CmdStart from "material-ui/svg-icons/av/play-arrow"
import CmdStop from "material-ui/svg-icons/av/stop"
import CircularProgress from "material-ui/CircularProgress"
import CSSModules from "react-css-modules"
import styles from "../Deployment.scss"
import deploymentAction,{startingStandalone,stoppingStandalone} from "./../../../actions/LocalDeploymentActions"


let LocalDeployment =(props)=>{
    const { dispatch,status,platformHost} = props;
    if(status==='Initialling'){
        dispatch(deploymentAction('query'));
    }

    const handleStart = () => {
        dispatch(startingStandalone());
        dispatch(deploymentAction('start'));
        // this.setState({status: 'Starting'});
        // var _this = this;
        // axios.get('/api/events').then((data)=>{
        //     console.log('data',data);
        //     _this.setState({status: 'started'});
        // })
    };

    const handleStop = () => {
        dispatch(stoppingStandalone());
        dispatch(deploymentAction('stop'));
        // this.setState({status: 'Stopping'});
        // var _this = this;
        // setTimeout(function () {
        //     _this.setState({status: 'stopped'});
        // }, 3000)
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
                <Tab label="One Click To Start">
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

const mapStateToProps=(state)=> {
    const { status, serverInfo } = state.localDeployment;
    console.log('mapStateToProps',state);
    return {
        status,
        serverInfo,
        platformHost:'192.168.99.100',
    }
}

export default connect(mapStateToProps)(CSSModules(LocalDeployment, styles))