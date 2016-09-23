import React from "react";
import {Field, reduxForm} from "redux-form";
import {TextField} from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";
import Checkbox from "material-ui/Checkbox";
import CSSModules from "react-css-modules";
import styles from "../Starter.scss";

let Step2 = ({handleSubmit, masterNodes, slaveNodes, previousPage, pristine, reset, submitting}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div styleName="stepContent">
                <div styleName="twoColumn">
                    <h3>Master Nodes</h3>
                    {masterNodes.map(function (row) {
                        return row.valid ? (<Checkbox label={row.ip} key={row.ip} defaultChecked={true}
                        />) : (<Checkbox styleName="checkboxInProgress"
                                         label={row.ip}
                                         key={row.ip}
                                         uncheckedIcon={<CircularProgress  size={0.3} />}
                        />)
                    })}
                </div>
                <div styleName="twoColumn">
                    <h3>Slave Nodes</h3>
                    {slaveNodes.map(function (row) {
                        return row.valid ? (<Checkbox label={row.ip} key={row.ip} defaultChecked={true}
                        />) : (<Checkbox styleName="checkboxInProgress"
                                         label={row.ip}
                                         key={row.ip}
                                         uncheckedIcon={<CircularProgress  size={0.3} />}
                        />)
                    })}
                </div>
            </div>
            <div styleName="stepActions">
                <FlatButton
                    label="Back"
                    disabled={pristine || submitting}
                    onTouchTap={previousPage}
                />
                <RaisedButton
                    label='Preview'
                    primary={true}
                    disabled={pristine || submitting}
                    type="submit"
                />
            </div>
        </form>
    )
}


export default reduxForm({
    form: 'remoteCluster',
    destroyOnUnmount: false,
})(CSSModules(Step2, styles))