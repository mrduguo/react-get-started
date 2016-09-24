import React, {Component} from "react";
import CSSModules from "react-css-modules";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./App.scss";


const App = CSSModules(({children,location:{pathname:currentPath}}) => (
    <div>
        <Header currentPath ={currentPath }/>
        <div styleName='content'>
            {children}
        </div>
        <Footer currentPath ={currentPath }/>
    </div>
), styles);

export default App;