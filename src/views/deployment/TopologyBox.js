import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import CSSModules from "react-css-modules";
import styles from "./Deployment.scss";

class TopologyBox extends React.Component {
    state = {
        zDepth: 1,
        open: this.props.open,
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {heading, description, requirements, actionTitle, actionIcon, children}=this.props;
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
                                      // onTouchTap={() => this.setState({open: true})}
                                      href="#/cluster"
                                      icon={actionIcon}/>
                    </div>
                    <Dialog
                        title={`Deploy To ${heading}`}
                        actions={<FlatButton
                                    label="OK"
                                    primary={true}
                                    onTouchTap={this.handleClose}
                                />
                                }
                        modal={false}
                        onRequestClose={this.handleClose}
                        open={this.state.open}
                        autoScrollBodyContent={true}
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

export default CSSModules(TopologyBox, styles);
