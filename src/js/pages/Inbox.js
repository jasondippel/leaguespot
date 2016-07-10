import React, {Component, PropTypes} from 'react';
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

export default class Inbox extends React.Component {
  constructor() {
    super();

    let invites = {};
    invites['test1@gmail.com'] = 'test1@gmail.com';
    invites['test2@gmail.com'] = 'test2@gmail.com';
    invites['test3@gmail.com'] = 'test3@gmail.com';
    invites['test4@gmail.com'] = 'test4@gmail.com';

    this.state = {
      messages: {},
      selectedIndex: 1
    }
  }

  getMessagesList() {
    let SelectableList = MakeSelectable(List);
    SelectableList = this.wrapState(SelectableList);

    if(Object.keys(this.state.messages).length === 0) {
      return(
        <div className="column12 center brightSecondaryText padTopSmall italicize skinny">
          Empty
        </div>
      );
    }

    // return (
    //   <div className="column12 left">
    //     <SelectableList defaultValue={1} onChangeFunction={this._handleMessageSelection.bind(this)}>
    //       <ListItem
    //         value={1}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //       <ListItem
    //         value={2}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //       <ListItem
    //         value={3}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //       <ListItem
    //         value={4}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //     </SelectableList>
    //   </div>
    // );
  }

  getSelectedMessage() {
    if(Object.keys(this.state.messages).length === 0) {
      return(
        <div className="column12 center padTop brightSecondaryText italicize skinny">
          No Message To Display
        </div>
      );
    }
  }

  // function for SelectableList
  wrapState(ComposedComponent) {
    return class SelectableList extends Component {
      static propTypes = {
        children: PropTypes.node.isRequired,
        defaultValue: PropTypes.number.isRequired,
        onChangeFunction: PropTypes.func.isRequired
      };

      componentWillMount() {
        this.setState({
          selectedIndex: this.props.defaultValue,
        });
      }

      handleRequestChange = (event, index) => {
        this.props.onChangeFunction(index);
        this.setState({
          selectedIndex: index,
        });
      };

      render() {
        return (
          <ComposedComponent
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
            {this.props.children}
          </ComposedComponent>
        );
      }
    };
  }

  _handleMessageSelection(newIndex) {
    console.log("selected message: " + newIndex);
  }

  render() {
    let that = this;
    let MessageListComponent = this.getMessagesList();
    let MessageDetails = this.getSelectedMessage();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="greyContainer">

            <div className="column3 sideMenu left">
              <div className="column12 mainTitle">
                Inbox
              </div>
              {MessageListComponent}
            </div>

            <div className="column9 darkContainer">
              {MessageDetails}
            </div>

        </div>
      </MuiThemeProvider>

    );
  }
}
