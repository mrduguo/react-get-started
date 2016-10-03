import React from "react"
import {Step, Stepper, StepLabel} from "material-ui/Stepper"
import CSSModules from "react-css-modules"
import styles from "../Starter.scss"
import RemoteStep1 from "./Step1"
import RemoteStep2 from "./Step2"
import RemoteStep3 from "./Step3"
import RemoteStep4 from "./Step4"

class RemoteDeployment extends React.Component {
  state = {
    stepIndex: 0,
    masterNodes: [],
    slaveNodes: [],
  };


  handleConfig = ({masterNodes, slaveNodes}) => {
    if (masterNodes) {
      let nodeStatus = []
      masterNodes.split('\n').forEach(function (ip, index) {
        nodeStatus.push({ip: ip, valid: index < 2 ? true : false})
      })
      this.setState({
        masterNodes: nodeStatus,
      });
    }

    if (slaveNodes) {
      let nodeStatus = []
      slaveNodes.split('\n').forEach(function (ip, index) {
        nodeStatus.push({ip: ip, valid: index < 2 ? true : false})
      })
      this.setState({
        slaveNodes: nodeStatus,
      });
    }
    this.handleNext();
  };

  handleFinish = ({masterNodes, slaveNodes}) => {
    this.setState({stepIndex: 0});
  };

  handleNext = () => {
    this.setState({stepIndex: this.state.stepIndex + 1});
  };

  handlePrev = () => {
    this.setState({stepIndex: this.state.stepIndex - 1});
  };

  handleSubmit = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  render () {
    const getStepContent = (stepIndex)=> {
      switch (stepIndex) {
        case 0:
          return <RemoteStep1 onSubmit={this.handleConfig}/>;
        case 1:
          return (<RemoteStep2
            onSubmit={this.handleNext}
            previousPage={this.handlePrev}
            masterNodes={this.state.masterNodes}
            slaveNodes={this.state.slaveNodes}
          />);
        case 2:
          return (<RemoteStep3
            onSubmit={this.handleNext}
            previousPage={this.handlePrev}
            masterNodes={this.state.masterNodes}
            slaveNodes={this.state.slaveNodes}
          />);
        case 3:
          return (<RemoteStep4
            onSubmit={this.handleFinish}
            previousPage={this.handlePrev}
            masterNodes={this.state.masterNodes}
            slaveNodes={this.state.slaveNodes}
          />);
      }
    }

    return (

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
        {getStepContent(this.state.stepIndex)}
      </div>
    );
  }
}


export default CSSModules(RemoteDeployment, styles);
