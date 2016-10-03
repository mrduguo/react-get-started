import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./Dashboard.scss";
import {LineTooltip,SimpleTooltip} from 'react-d3-tooltip';
import ChartRealTime   from './ChartRealTime';
import EventsOverTime   from './EventsOverTime';
import UsersOverTime   from './UsersOverTime';

class Dashboard extends React.Component {
    render() {
        var width=window.innerWidth;
        return (
            <div>
                <ChartRealTime width={width}/>
                <EventsOverTime width= {width}/>
                <UsersOverTime width= {width}/>
            </div>
        );
    }
}

export default CSSModules(Dashboard, styles);
