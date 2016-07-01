import React from "react";
import customTheme from '../../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import moment from "moment";
import APIRequest from "../../../scripts/APIRequest";
import * as ProLeagues from "../../../scripts/ProLeagues";

export default class RuleSetup extends React.Component {
  constructor() {
    super()
  }

  handlePrivacyChange(e, key, value) {
    this.props.handlePrivacyChange(value);
  }

  handleLeagueSizeChange(e) {
    let value = e.target.value;
    this.props.handleLeagueSizeChange(value);
  }

  handleStartDateChange(e, newDate) {
    // TODO: convert to utc dateTime
    let dateObj = new Date(newDate);
    this.props.handleStartDateChange(dateObj);
  }

  handleStartTimeChange(e, newDateTime) {
    // TODO: convert to utc dateTime
    let dateObj = new Date(newDateTime);
    this.props.handleStartTimeChange(dateObj);
  }

  render() {
    let that = this;

    let privacyOptions = [
      <MenuItem key={0} value={'public'} primaryText={'Public'} />,
      <MenuItem key={1} value={'private'} primaryText={'Private'} />
    ];

    return (
      <div className="column12">

        <div className="column12">
          <span className="title">League Start Date</span>
          <p className="subtext">This is the cutoff date for your league. After this date and time, members will no longer be able to join your league. All team selections must be done before this time.</p>
        </div>

        <div className="column12">

          <div className="column6">
            <DatePicker
              hintText="League Start Date"
              value={that.props.leagueData.league_start_dateTime}
              onChange={that.handleStartDateChange.bind(that)}/>
          </div>

          <div className="column6">
            <TimePicker
              hintText="League Start Time"
              value={that.props.leagueData.league_start_dateTime}
              onChange={that.handleStartTimeChange.bind(that)} />
          </div>
        </div>

        <div className="column12 padTop">
          <span className="title">League Rules</span>
          <p className="subtext">Time to get into the details! Feel free to change the defaults below and customize your fantasy league to make it work how you want.</p>
        </div>

        <div className="column12">
          <div className="column6">
            <SelectField
              value={ that.props.leagueData.privacy_mode !== "" ? that.props.leagueData.privacy_mode : null }
              onChange={that.handlePrivacyChange.bind(that)}
              floatingLabelText="Privacy"
            >
              {privacyOptions}
            </SelectField>
          </div>

          <div className="column6">
            <TextField
              onChange={that.handleLeagueSizeChange.bind(that)}
              floatingLabelText="Max League Size"
              fullWidth={true}
              value={ that.props.leagueData.league_size_limit !== "" ? that.props.leagueData.league_size_limit : null } />
          </div>
        </div>

      </div>
    )
  }
}
