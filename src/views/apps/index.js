import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./Apps.scss";
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentDeploy from 'material-ui/svg-icons/av/play-arrow';
import ContentUndeploy from 'material-ui/svg-icons/av/stop';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

class Dashboard extends React.Component {

  state = {
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  onClick = (a,b,event) => {
    console.log('a',a)
    console.log('b',b)

    event.stopPropagation();
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Table multiSelectable={true} onCellClick={this.onClick}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
              <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={false}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>
                    {index}
                </TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn styleName='prevent-cell-click'>
                  <div styleName='prevent-cell-click-wrapper' onClick={e => e.stopPropagation()}>
                    <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      useLayerForClickAway={true}
                    >
                      <MenuItem primaryText="Deploy" leftIcon={<ContentDeploy />} />
                      <MenuItem primaryText="Undeploy" leftIcon={<ContentUndeploy />} />
                      <MenuItem primaryText="Delete" leftIcon={<ContentDelete />} />
                    </IconMenu>
                  </div>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FloatingActionButton styleName="buttonAdd" secondary={true}>
          <ContentAdd />
        </FloatingActionButton>
        <FloatingActionButton styleName="buttonDelete" mini={true}>
          <ContentDelete />
        </FloatingActionButton>
        <FloatingActionButton styleName="buttonDeploy" mini={true}>
          <ContentUndeploy />
        </FloatingActionButton>
        <FloatingActionButton styleName="buttonUndeploy" mini={true}>
          <ContentDeploy />
        </FloatingActionButton>
      </div>
    );
  }
}

export default CSSModules(Dashboard, styles);
