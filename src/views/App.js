import React, {Component} from "react";
import CSSModules from "react-css-modules";
import Header from "./layout/Header";
import Deployment from "./deployment";
import styles from "./App.scss";


const App = CSSModules(({params:{topology}}) => (
    <div>
        <Header/>
        <div styleName='content'>
            <Deployment topology={topology || 'none'}/>
        </div>
    </div>
), styles);

export default App;
