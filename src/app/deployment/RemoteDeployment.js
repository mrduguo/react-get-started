import React from "react"
import Dialog from "material-ui/Dialog"
import {Step, Stepper, StepLabel} from "material-ui/Stepper"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import CloudRemote from "material-ui/svg-icons/file/cloud-circle"
import CircularProgress from "material-ui/CircularProgress"

import Checkbox from 'material-ui/Checkbox';
import {Field, reduxForm} from "redux-form"
import {TextField} from "redux-form-material-ui"
import CSSModules from "react-css-modules"
import styles from "./Deployments.scss"

const validate = values => {
  console.log(values)
  const errors = {}
  if (!values.masterNodes) {
    errors.masterNodes = 'Required'
  }
  return errors
}


class ConfigForm extends React.Component {
  render () {
    return (
      <form>
        <div>
          <div styleName="twoColumn">
            <Field
              name="masterNodes"
              component={TextField}
              hintText="A host name or IP each line"
              floatingLabelText="Master Nodes"
              multiLine={true}
              rows={2}/>
          </div>
          <div>
            <div styleName="twoColumn">
              <Field
                name="slaveNodes"
                component={TextField}
                hintText="A host name or IP each line"
                floatingLabelText="Slave Nodes (Optional)"
                multiLine={true}
                rows={2}/>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

const NodesForm = reduxForm({
  form: 'config',
  destroyOnUnmount: false,
  validate
})(CSSModules(ConfigForm, styles))

class RemoteDeployment extends React.Component {
  state = {
    open: false,
    status: 'stopped',
    platformHost: '192.168.99.100',
    stepIndex: 0,
    masterNodes:[],
    slaveNodes:[],
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

  handleNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex==0){
      if(store.getState().form.config.values.masterNodes){
        let nodeStatus=[]
        store.getState().form.config.values.masterNodes.split('\n').forEach(function(ip,index){
          nodeStatus.push({ip:ip,valid:index<2?true:false})
        })
        this.setState({
          masterNodes: nodeStatus,
        });
        console.log('this.state.masterNodes');
        console.log(this.state.masterNodes);
      }
      if(store.getState().form.config.values.slaveNodes){
        let nodeStatus=[]
        store.getState().form.config.values.slaveNodes.split('\n').forEach(function(ip,index){
          nodeStatus.push({ip:ip,valid:index<2?true:false})
        })
        this.setState({
          slaveNodes: nodeStatus,
        });

      }
    }
    this.setState({
      stepIndex: stepIndex < 3 ? stepIndex + 1 : 0,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleSubmit = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  debugContext = () => {
    console.log('store')
  };


  render () {
    console.log('store')
    console.log(store.getState())
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


    const getStepContent = (stepIndex)=> {
      switch (stepIndex) {
        case 0:
          return (
            <NodesForm/>
          );
        case 1:
          return (
            <div>
              <div styleName="twoColumn">
              <h3>Master Nodes</h3>
                {this.state.masterNodes.map(function(row) {
                  return row.valid?(<Checkbox  label={row.ip} defaultChecked={true}
                  />):(<Checkbox  styleName="checkboxInProgress"
                                  label={row.ip}
                                  uncheckedIcon={<CircularProgress  size={0.3} />}
                  />)
                })}
                </div>
              <div styleName="twoColumn">
              <h3>Slave Nodes</h3>
                {this.state.slaveNodes.map(function(row) {
                  return row.valid?(<Checkbox  label={row.ip} defaultChecked={true}
                  />):(<Checkbox  styleName="checkboxInProgress"
                  label={row.ip}
                  uncheckedIcon={<CircularProgress  size={0.3} />}
                  />)
                })}
                </div>
              </div>
          );
        case 2:
          return 'extra';
        case 3:
          return 'deploy';
        default:
          return 'restart?';
      }
    }


    const nextButtonText = (stepIndex)=> {
      switch (stepIndex) {
        case 0:
          return 'Validate';
        case 1:
          return 'Preview';
        case 2:
          return 'Deploy';
        case 3:
          return 'Create New Deployment';
        default:
          return 'Next';
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
            Deploy the platform via <b>ansible</b> to one or more linux based clusters.
          </div>
          <div styleName="gridRequirements">
            <h4>Requirements</h4>
            <ul>
              <li>ssh access</li>
              <li>python</li>
            </ul>
          </div>
          <RaisedButton primary={true} fullWidth={true} label="Configure" onTouchTap={this.handleOpen}
                        icon={<CloudRemote/>}/>
        </div>
        <Dialog
          title="Deploy To Remote Cluster"
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          autoScrollBodyContent={true}
        >

          <div>
            <Stepper activeStep={this.state.stepIndex}>
              <Step>
                <StepLabel>Configure Nodes</StepLabel>
              </Step>
              <Step>
                <StepLabel>Validate Connectivity</StepLabel>
              </Step>
              <Step>
                <StepLabel>Preview</StepLabel>
              </Step>
              <Step>
                <StepLabel>Deploy</StepLabel>
              </Step>
            </Stepper>
            <div styleName="stepContent">
              {getStepContent(this.state.stepIndex)}
            </div>
            <div styleName="stepActions">
              <FlatButton
                label="Back"
                disabled={this.state.stepIndex === 0 || this.state.stepIndex === 3}
                onTouchTap={this.handlePrev}
              />
              <RaisedButton
                label={nextButtonText(this.state.stepIndex)}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}


export default CSSModules(RemoteDeployment, styles);
