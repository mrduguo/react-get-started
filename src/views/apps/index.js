import React, {Component} from "react"
import CSSModules from "react-css-modules"
import styles from "./Apps.scss"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import ContentDelete from "material-ui/svg-icons/action/delete"
import ContentDeploy from "material-ui/svg-icons/av/play-arrow"
import ContentUndeploy from "material-ui/svg-icons/av/stop"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import IconButton from "material-ui/IconButton"
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert"

const tableData = [
  {
    name: 'Zookeeper',
    status: 'Started',
  },
  {
    name: 'Kafka',
    status: 'Started',
  },
  {
    name: 'Schema Registry',
    status: 'Started',
  },
  {
    name: 'Kafka Rest',
    status: 'Started',
  },
  {
    name: 'Event Generator',
    status: 'Started',
  },
  {
    name: 'Timezone Converter',
    status: 'Stopped',
  },
  {
    name: 'Dashboard',
    status: 'Stopped',
  },
];

class Dashboard extends React.Component {
  state = {
    disableDeploy: true,
    disableUndeploy: true,
    disableDelete: true,
  };

  onDelete = (index)=> {
    if (index == 'selected') {
      for (var i = tableData.length; i > 0; i--) {
        if (tableData[i - 1]['selected']) {
          tableData.splice(i - 1, 1);
        }
      }
    } else {
      tableData.splice(index, 1);
    }
    this.setState({
      disableDelete: true,
      disableDeploy: true,
      disableUndeploy: true,
    })
  }

  onDeploy = (index)=> {
    if (index == 'selected') {
      for (var row of tableData) {
        if (row['selected']) {
          row.status = 'Started';
        }
      }
      this.setState({
        disableDeploy: true,
        disableUndeploy: false,
      })
    } else {
      tableData[index].status = 'Started';
      this.setState({})
    }
  }

  onUndeploy = (index)=> {
    if (index == 'selected') {
      for (var row of tableData) {
        if (row['selected']) {
          row.status = 'Stopped';
        }
      }
      this.setState({
        disableDeploy: false,
        disableUndeploy: true,
      })
    } else {
      tableData[index].status = 'Stopped';
      this.setState({})
    }
  }

  onRowSelection = (selectedRows) => {
    switch (selectedRows) {
      case 'none':
        for (var row of tableData) {
          row['selected'] = false;
        }
        setTimeout(()=> {
          this.setState({
            disableDeploy: true,
            disableUndeploy: true,
            disableDelete: true,
          })
        }, 0)
        return;
      case 'all':
        selectedRows = Array.from(Array(tableData.length).keys())
      default:
        var disableDeploy = true;
        var disableUndeploy = true;
        var disableDelete = true;
        for (let [index, row] of tableData.entries()) {
          if (selectedRows.includes(index)) {
            row['selected'] = true;
            if (row.status == 'Started') {
              disableUndeploy = false;
            } else if (row.status == 'Stopped') {
              disableDeploy = false;
            }
            disableDelete = false;
          } else {
            row['selected'] = false;
          }
        }
        this.setState({
          disableDeploy: disableDeploy,
          disableUndeploy: disableUndeploy,
          disableDelete: disableDelete,
        })
    }
    return selectedRows;
  };

  render () {
    let wideColumns = true;
    if (window.innerWidth < 415) {
      wideColumns = false;
    }

    return (
      <div>
        <Table multiSelectable={true} onRowSelection={this.onRowSelection}>
          <TableHeader>
            {wideColumns ? (
              <TableRow>
                <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
                <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
              </TableRow>
            ) : (
              <TableRow>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
              </TableRow>
            )}
          </TableHeader>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
          >
            {tableData.map((row, index) => (
              wideColumns ? (
                <TableRow key={index} selected={row.selected?true:false}>
                  <TableRowColumn>
                    {index + 1}
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
                        <MenuItem primaryText="Deploy" disabled={row.status=='Started'?true:false}
                                  leftIcon={<ContentDeploy />}
                                  onTouchTap={()=>{this.onDeploy(index)}}/>
                        <MenuItem primaryText="Undeploy" disabled={row.status=='Stopped'?true:false}
                                  leftIcon={<ContentUndeploy />}
                                  onTouchTap={()=>{this.onUndeploy(index)}}/>
                        <MenuItem primaryText="Delete" leftIcon={<ContentDelete />}
                                  onTouchTap={()=>{this.onDelete(index)}}/>
                      </IconMenu>
                    </div>
                  </TableRowColumn>
                </TableRow>
              ) : (
                <TableRow key={index} selected={row.selected?true:false}>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn styleName='prevent-cell-click'>
                    <div styleName="status">{row.status}</div>
                    <div styleName='prevent-cell-click-wrapper'
                         onClick={e => e.stopPropagation()}
                         style={{float:'right'}}>
                      <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        useLayerForClickAway={true}

                      >
                        <MenuItem primaryText="Deploy" disabled={row.status=='Started'?true:false}
                                  leftIcon={<ContentDeploy />}
                                  onTouchTap={()=>{this.onDeploy(index)}}/>
                        <MenuItem primaryText="Undeploy" disabled={row.status=='Stopped'?true:false}
                                  leftIcon={<ContentUndeploy />}
                                  onTouchTap={()=>{this.onUndeploy(index)}}/>
                        <MenuItem primaryText="Delete" leftIcon={<ContentDelete />}
                                  onTouchTap={()=>{this.onDelete(index)}}/>
                      </IconMenu>
                    </div>
                  </TableRowColumn>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
        <FloatingActionButton styleName="buttonAdd" secondary={true} onTouchTap={()=>{alert('TODO')}}>
          <ContentAdd />
        </FloatingActionButton>
        <FloatingActionButton styleName="buttonDelete" mini={true} disabled={this.state.disableDelete}
                              onTouchTap={()=>{this.onDelete('selected')}}>
          <ContentDelete />
        </FloatingActionButton>
        <FloatingActionButton styleName="buttonUndeploy" mini={true} disabled={this.state.disableUndeploy}
                              onTouchTap={()=>{this.onUndeploy('selected')}}>
          <ContentUndeploy />
        </FloatingActionButton>
        <FloatingActionButton styleName="buttonDeploy" mini={true} disabled={this.state.disableDeploy}
                              onTouchTap={()=>{this.onDeploy('selected')}}>
          <ContentDeploy />
        </FloatingActionButton>
      </div>
    );
  }
}

export default CSSModules(Dashboard, styles);
