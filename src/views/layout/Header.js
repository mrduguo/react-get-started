import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import FileCloud from "material-ui/svg-icons/file/cloud";
import CSSModules from "react-css-modules";
import styles from "./Header.scss";


const Logo = CSSModules(() => (
    <div styleName='logo'/>
), styles);

const Header = () => (
    <AppBar
        title="Cloud Platform - Starter"
        styleName='appBar'
        // iconElementLeft={<Logo/>}
        iconElementLeft={<IconButton href="/"><FileCloud/></IconButton>}
        iconElementRight={<FlatButton label="Docs" href="/"/>}
    />
)

export default CSSModules(Header, styles);
