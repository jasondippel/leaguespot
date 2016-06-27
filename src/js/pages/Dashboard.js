import React from "react";
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Group from 'material-ui/svg-icons/social/group';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import Spinner from "../components/loading/Spinner";

import APIRequest from "../scripts/APIRequest";
import UserStore from "../stores/UserStore";
import FantasyLeagueStore from "../stores/FantasyLeagueStore";
import * as FantasyLeagueActions from "../actions/FantasyLeagueActions";


export default class Upcoming extends React.Component {
  constructor() {
    super();

    this.state = {
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

  _goToLeagueDashboard(event) {
    let leagueId = event.target.dataset.leagueid;

    FantasyLeagueActions.setActiveFantasyLeagueById(leagueId);
    this.props.history.push("/fantasyLeague/dashboard/" + leagueId);
  }

  getMyFantasyLeagues() {
    let that = this;

    if(!this.state.myFantasyLeagues) {
      return (
        <Spinner />
      )
    } else if (this.state.myFantasyLeagues == {}) {
      return (
        <div className='column12 center brightSecondaryText'>You haven't entered any fantasy leagues!</div>
      );
    } else {
      return (
        <List>
        {this.state.myFantasyLeagues.map(function(leagueData, index) {
          if(index === that.state.myFantasyLeagues.length - 1) {
            return (
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
            return (
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
        })}
        </List>
      );
    }
  }

  render() {

    let myFantasyLeaguesComponent = this.getMyFantasyLeagues();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="darkContainer">

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

            <div className="column10">
              <div className="column12 thickContainer">
                <div className="column6"></div>
                <div className="column6 right">
                  <FlatButton label="Edit Account" secondary={true} />
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
                    <div className='column12 center brightSecondaryText'>No Upcoming Events</div>
                  </Tab>
                </Tabs>
              </div>
            </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
