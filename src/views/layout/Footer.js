import React, {Component} from "react"
import {withRouter} from "react-router"
import AppsIcon from "material-ui/svg-icons/navigation/apps"
import StarterIcon from "material-ui/svg-icons/av/add-to-queue"
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation"
import CSSModules from "react-css-modules"
import styles from "./Footer.scss"


const selectedIndex = (currentPath)=> {
  switch (currentPath) {
    case "/starter":
      return 1;
    default:
      return 0;
  }
}

const Footer = ({currentPath, router}) => (
  <BottomNavigation styleName="footer" selectedIndex={selectedIndex(currentPath)}>
    <BottomNavigationItem
      label="Apps"
      icon={<AppsIcon/>}
      onTouchTap={()=>router.push('/')}
    />
    <BottomNavigationItem
      label="Starter"
      icon={<StarterIcon/>}
      onTouchTap={()=>router.push('/starter')}
    />
  </BottomNavigation>
)


export default withRouter(CSSModules(Footer, styles));
