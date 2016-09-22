import React from "react";
import {Field, reduxForm} from "redux-form";
import {TextField} from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import CSSModules from "react-css-modules";
import styles from "../Deployment.scss";

let Step3 = ({onSubmit, masterNodes, slaveNodes, previousPage}) => {
    const buildCmd = ()=> {
        return (<div>
            <div>docker run -d -p 80:8888\</div>
            <div>{'\u00a0\u00a0\u00a0\u00a0'}--name platform-cloud-stater\</div>
            <div>{'\u00a0\u00a0\u00a0\u00a0'}-v /data:/data\</div>
            {masterNodes.length > 0 && (<div>{'\u00a0\u00a0\u00a0\u00a0'}--materNodes=
                {masterNodes.map((entry, index)=> {
                    return <span key={index}>{index != 0 && ','}{entry.ip}</span>
                })}\
            </div>)}
            {slaveNodes.length > 0 ? (<div>{'\u00a0\u00a0\u00a0\u00a0'}--slaveNodes=
                {slaveNodes.map((entry, index)=> {
                    return <span key={index}>{index != 0 && ','}{entry.ip}</span>
                })}\
            </div>) : (<div>{'\u00a0\u00a0\u00a0\u00a0'}--slaveNodes=
                {masterNodes.map((entry, index)=> {
                    return <span key={index}>{index != 0 && ','}{entry.ip}</span>
                })}\
            </div>)}
            <div>{'\u00a0\u00a0\u00a0\u00a0'}cloud-stater</div>
            <div>{'\u00a0'}</div>
        </div>)
    }


    return (
        <div>
            <div styleName="stepContent">
                <div styleName="localTab">
                    <div styleName="localResult">
                        <div styleName="code">
                            {buildCmd()}
                        </div>
                    </div>
                    <h4>Run the command to start the platform straight away</h4>
                </div>
            </div>
            <div styleName="stepActions">
                <FlatButton
                    label="Back"
                    onTouchTap={previousPage}
                />
                <RaisedButton
                    label='Deploy'
                    primary={true}
                    onTouchTap={onSubmit}
                />
            </div>
        </div>
    )
}


export default CSSModules(Step3, styles)