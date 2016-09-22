import React from "react";
import {Field, reduxForm} from "redux-form";
import {TextField} from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import CSSModules from "react-css-modules";
import styles from "../Deployment.scss";


const validate = values => {
    const errors = {}
    if (!values.masterNodes) {
        errors.masterNodes = 'Required'
    }
    return errors
}


let Step1 = ({handleSubmit, pristine, reset, submitting}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div styleName="stepContent">
                <div styleName="twoColumn">
                    <Field
                        name="masterNodes"
                        component={TextField}
                        hintText="A host name or IP each line"
                        floatingLabelText="Master Nodes"
                        multiLine={true}
                        rows={2}/>
                </div>
                <div>
                    <div styleName="twoColumn">
                        <Field
                            name="slaveNodes"
                            component={TextField}
                            hintText="A host name or IP each line"
                            floatingLabelText="Slave Nodes (Optional)"
                            multiLine={true}
                            rows={2}/>
                    </div>
                </div>
            </div>
            <div styleName="stepActions">
                <FlatButton
                    label="Reset"
                    disabled={pristine || submitting}
                    onTouchTap={reset}
                />
                <RaisedButton
                    label='Validate'
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
    validate
})(CSSModules(Step1, styles))