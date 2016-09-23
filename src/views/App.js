import React, {Component} from "react";
import CSSModules from "react-css-modules";
import Header from "./layout/Header";
import styles from "./App.scss";


const App = CSSModules(({children,location:{pathname:currentPath}}) => (
    <div>
        <Header currentPath ={currentPath }/>
        <div styleName='content'>
            {children}
        </div>
    </div>
), styles);

export default App;
