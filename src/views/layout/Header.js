import React, {Component} from "react"
import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import FileCloud from "material-ui/svg-icons/file/cloud"
import CSSModules from "react-css-modules"
import styles from "./Header.scss"

const selectedTitle = (currentPath)=> {
  switch (currentPath) {
    case "/apps":
      return ' - Apps';
    case "/starter":
      return ' - Starter';
    default:
      return '';
  }
}

const Header = ({currentPath}) => (
  <AppBar
    title={`Cloud Platform${selectedTitle(currentPath)}`}
    styleName='appBar'
    iconElementLeft={<IconButton href="#"><FileCloud/></IconButton>}
  />
)

export default CSSModules(Header, styles);
