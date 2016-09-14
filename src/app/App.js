/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CloudLocal from 'material-ui/svg-icons/file/cloud-download';
import CloudRemote from 'material-ui/svg-icons/file/cloud-circle';
import AppBar from 'material-ui/AppBar';
import CSSModules from 'react-css-modules';
import Header from './layout/Header';
import Deployments from './deployment/Deployments';
import styles from './App.scss';



const Content=CSSModules(() => (
  <div styleName='content'>
    <Deployments/>
  </div>
), styles);

//
// const CardExampleExpandable=CSSModules(() => (
//   <Card>
//     <CardHeader
//       title="Local Standalone"
//     />
//     <CardText>
//       Deploy the platform with local docker run command.
//     </CardText>
//     <CardActions>
//       <FlatButton label="Run" icon={<CloudLocal/>}/>
//     </CardActions>
//   </Card>
// ), styles);
//
// const CardExampleExpandable2 = () => (
//   <Card>
//     <CardHeader title="Remote Cluster" />
//     <CardText>
//       Deploy the platform to one or more remote linux nodes with <a href="https://www.ansible.com/">Ansible</a>.
//     </CardText>
//     <CardActions>
//       <FlatButton label="Configure" icon={<CloudRemote/>}/>
//     </CardActions>
//   </Card>
// );
//
// const style = {
//   height: 400,
//   width: 300,
//   margin: 20,
//   display: 'inline-block',
// };
//
// const PaperExampleSimple = () => (
//   <div>
//     <Paper style={style} zDepth={3}>
//       <CardExampleExpandable/>
//     </Paper>
//     <Paper style={style} zDepth={3}>
//       <CardExampleExpandable2/>
//     </Paper>
//   </div>
// );


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header/>
          <Content/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
