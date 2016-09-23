import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./../starter/Starter.scss";

const Dashboard = () => (
    <div>
        <a href="#/starter">Starter</a>
    </div>
)

export default CSSModules(Dashboard, styles);
