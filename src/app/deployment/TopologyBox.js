import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import CSSModules from "react-css-modules"
import styles from "./Deployments.scss"

var TopologyBox = React.createClass({
    getInitialState: function () {
        return {zDepth: 1,};
    },
    handleMouseEnter: function () {
        this.setState({
            zDepth: 4,
        });
    },
    handleMouseLeave: function () {
        this.setState({
            zDepth: 1,
        });
    },
    render: function () {
        return (
            <Paper
                zDepth={this.state.zDepth}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                styleName="deployment"
            >
                <h3 styleName="title">{this.props.heading}</h3>
                {this.props.children}
            </Paper>);
    }
});


export default CSSModules(TopologyBox, styles);