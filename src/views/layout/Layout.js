import React, {Component} from "react"
import CSSModules from "react-css-modules"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Layout.scss"


const Layout = CSSModules(({children, location:{pathname:currentPath}}) => (
  <div>
    <Header currentPath={currentPath }/>
    <div styleName='content'>
      {children}
    </div>
    <Footer currentPath={currentPath }/>
    <div className="react-loaded"/>
  </div>
), styles);

export default Layout;
