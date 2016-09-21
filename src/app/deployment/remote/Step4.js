import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {TextField} from "redux-form-material-ui"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import CSSModules from "react-css-modules"
import styles from "../Deployment.scss"

let Step4 = (props) => {
    const {handleSubmit, masterNodes, slaveNodes, previousPage, pristine, reset, submitting} = props
    const restart=(values)=>{
        handleSubmit();
        reset();
    }
    return (
        <form onSubmit={restart}>
            <div styleName="stepContent"><div>
                <h3>Platform Dashboard</h3>
                <div>
                    <a href={'http://'+masterNodes[0].ip}>http://{masterNodes[0].ip}</a>
                </div>
            </div>
            </div>
            <div styleName="stepActions">
                <FlatButton
                    label="Back"
                    disabled={pristine || submitting}
                    onTouchTap={previousPage}
                />
                <RaisedButton
                    label='Restart'
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
})(CSSModules(Step4, styles))