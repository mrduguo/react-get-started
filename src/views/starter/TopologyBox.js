import React, {Component, PropTypes} from "react"
import Paper from "material-ui/Paper"
import {withRouter} from "react-router"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import Dialog from "material-ui/Dialog"
import CSSModules from "react-css-modules"
import styles from "./Starter.scss"

class TopologyBox extends React.Component {
  state = {
    zDepth: 1,
  }

  render () {
    const {heading, description, requirements, actionTitle, actionIcon, children, path, open, router}=this.props;


    let customContentStyle = {};
    let customOverlayStyle = {};

    if (window.innerWidth < 415 || window.innerHeight < 415) {
      customContentStyle = {
        width: '100%',
        maxWidth: 'none',
      };
      customOverlayStyle = {
        backgroundColor: 'gray',
      };
    }

    return (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={() => this.setState({zDepth: 4})}
        onMouseLeave={() => this.setState({zDepth: 1})}
        styleName="deployment"
      >
        <h3 styleName="gridTitle">{heading}</h3>
        <div>
          <div styleName="gridContent">
            <div>{description}</div>
            <div styleName="gridRequirements">
              <h4>Requirements</h4>
              <ul>
                {requirements.map(function (requirement, index) {
                  return (<li key={index}>{requirement}</li>)
                })}
              </ul>
            </div>
            <RaisedButton primary={true} fullWidth={true} label={actionTitle}
                          onTouchTap={()=>router.push(path)}
                          icon={actionIcon}/>
          </div>
          <Dialog
            title={`Deploy To ${heading}`}
            actions={<FlatButton
                                    label="OK"
                                    primary={true}
                                    onTouchTap={()=>router.push('/starter')}
                                />
                                }
            modal={false}
            onRequestClose={()=>router.push('/')}
            open={open}
            autoScrollBodyContent={true}
            contentStyle={customContentStyle}
            overlayStyle={customOverlayStyle}
          >
            {children}
          </Dialog>
        </div>
      </Paper>
    );
  }
}

TopologyBox.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default withRouter(CSSModules(TopologyBox, styles));
