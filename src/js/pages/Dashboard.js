import React from "react";
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Group from 'material-ui/svg-icons/social/group';
import {Tabs, Tab} from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import Spinner from "../components/loading/Spinner";

import APIRequest from "../scripts/APIRequest";
import UserStore from "../stores/UserStore";
import FantasyLeagueStore from "../stores/FantasyLeagueStore";
import * as FantasyLeagueActions from "../actions/FantasyLeagueActions";


export default class Upcoming extends React.Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
      myFantasyLeagues: FantasyLeagueStore.getMyFantasyLeagues()
    };
  }


  componentWillMount() {
    FantasyLeagueStore.on("change", this.setMyFantasyLeagues.bind(this));
  }


  componentDidMount() {
    if(!this.state.myFantasyLeagues) {
      FantasyLeagueActions.loadMyFantasyLeagues();
    }
  }


  componentWillUnmount() {
    FantasyLeagueStore.removeListener("change", this.setMyFantasyLeagues.bind(this));
  }


  setMyFantasyLeagues() {
    let myFantasyLeagues = FantasyLeagueStore.getMyFantasyLeagues();
    this.setState({
      myFantasyLeagues: myFantasyLeagues
    });
  }


  _handleDialogOpen = () => {
    this.setState({
      dialogOpen: true
    });
  };


  _handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };


  _goToLeagueDashboard(event) {
    let leagueId = event.target.dataset.leagueid;

    FantasyLeagueActions.setActiveFantasyLeagueById(leagueId);
    this.props.history.push("/fantasyLeague/" + leagueId + "/dashboard");
  }


  _goToCreateLeague(event) {
    this.props.history.push("/createLeague");
  }


  _editAccount() {
    this._handleDialogOpen();
  }


  getLeaguesList() {
    let that = this;

    if(this.state.myFantasyLeagues.length === 0) {
      return (
        <div className="column12 center brightSecondaryText">
          <p>You don't seem to belong to any leagues yet...</p>
          <button
            className="btn greenSolidBtn"
            onClick={that._goToCreateLeague.bind(that)}
            >
            Create a League!
          </button>
        </div>
      );
    }

    let leaguesList;
    this.state.myFantasyLeagues.map(function(leagueData, index) {
      if(index === (that.state.myFantasyLeagues.length - 1) ) {
        leaguesList.push(
          <ListItem
            leftAvatar={<Avatar icon={ <Group /> } />}
            primaryText={
              leagueData.fleague_name
            }
            rightIcon={(
              <button
                className="btn listButton"
                data-leagueId={leagueData.fleague_id}
                onClick={that._goToLeagueDashboard.bind(that)} >
                View
              </button>
            )}
          />
        );
      } else {
        leaguesList.push(
          <span>
            <ListItem
              leftAvatar={<Avatar icon={ <Group /> } />}
              primaryText={
                leagueData.fleague_name
              }
              rightIcon={(
                <button
                  className="btn listButton"
                  data-leagueId={leagueData.fleague_id}
                  onClick={that._goToLeagueDashboard.bind(that)} >
                  View
                </button>
              )}
            />
          <Divider />
        </span>
        );
      }
    });

    return leaguesList;

  }


  getMyFantasyLeagues() {
    let that = this;

    if(!this.state.myFantasyLeagues) {
      return (
        <Spinner />
      )
    } else {
      let leaguesList = this.getLeaguesList();

      return (
        <List>
          {leaguesList}
        </List>
      );
    }
  }


  render() {

    let myFantasyLeaguesComponent = this.getMyFantasyLeagues();

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this._handleDialogClose}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="greyContainer">

            <div className="column2 sideMenu">
              <div className="accountImage">
                <AccountBox
                  color={'#aaa'}
                  iconStyle={{width: '112px', height: '112px'}}
                  style={{width: '124px', height: '124px'}}
                  />
                <br/>
                <span>{UserStore.getFullName()}</span>
              </div>

            </div>

            <div className="column10 darkContainer">

              <div className="column12 leagueBanner">
                  <div className="column8">
                    <span className="title">{UserStore.getFullName()}</span><br/>
                    <span className="subtext below small">User Dashboard</span>
                  </div>
                  <div className="column4 right" style={{paddingTop: "1.5em"}}>
                    <button
                      className="btn simpleDarkBtn"
                      onClick={this._editAccount.bind(this)}
                      >
                      Edit Account
                    </button>
                  </div>
              </div>

              <div className='column6 standardContainer left'>
                <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                  <Tab label="My Fantasy Leagues" >
                    {myFantasyLeaguesComponent}
                  </Tab>
                </Tabs>
              </div>

              <div className='column6 standardContainer right'>
                <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                  <Tab label="Upcoming Events" >
                    <div className='column12 center brightSecondaryText'>
                      <p>No Upcoming Events</p>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>

            <Dialog
              actions={actions}
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={this._handleDialogClose}
            >
              Account Settings
            </Dialog>

        </div>
      </MuiThemeProvider>
    );
  }
}
