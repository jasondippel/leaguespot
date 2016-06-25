import React from "react";
import UserStore from "../stores/UserStore";
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import APIRequest from "../scripts/APIRequest";
import Spinner from "../components/loading/Spinner";

export default class Upcoming extends React.Component {
  constructor() {
    super();

    this.state = {
      myFantasyLeagues: null
    };
  }

  _getFantasyLeagues() {
    if(!this.state.myFantasyLeagues) {
      return (
        <LoadingScreen />
      )
    }
  }

  render() {

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
                    <Spinner />
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
