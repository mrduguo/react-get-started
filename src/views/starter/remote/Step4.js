import React from "react"
import {reduxForm} from "redux-form"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import CSSModules from "react-css-modules"
import styles from "../Starter.scss"

let Step4 = ({handleSubmit, masterNodes, slaveNodes, previousPage, pristine, reset, submitting}) => {
  const restart = ()=> {
    handleSubmit();
    reset();
  }
  return (
    <form onSubmit={restart}>
      <div styleName="stepContent">
        <div>
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