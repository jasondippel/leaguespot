import React from "react";
import customTheme from '../../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

import moment from "moment";
import APIRequest from "../../../scripts/APIRequest";
import * as ProLeagues from "../../../scripts/ProLeagues";

export default class LeagueSetup extends React.Component {
  constructor() {
    super()
  }

  handleFantasyLeagueNameChange(e) {
    let value = e.target.value;
    this.props.handleFantasyLeagueNameChange(value);
  }

  handleSportChange(e, key, value) {
    this.props.handleSportChange(value);
  }

  handleFantasyLeagueTypeChange(e, key, value) {
    this.props.handleFantasyLeagueTypeChange(value);
  }

  handleProLeagueSelectionChange(e, isInputChecked) {
    this.props.handleProLeagueSelectionChange(e.target.value, isInputChecked);
  }

  render() {
    let that = this;

    const sports = ProLeagues.getSports();
    let sportOptions = [];
    let proLeagueOptions = [];
    let contestTypeOptions = [
      <MenuItem key={0} value={'league'} primaryText={'Seasonal'} />
    ];

    var i;
    for(i=0; i < sports.length; i++) {
      sportOptions.push(
        <MenuItem key={i} value={sports[i]} primaryText={sports[i]} />
      );
    }

    if(this.props.leagueData.sport) {
      let leagues = ProLeagues.getLeaguesInSport(this.props.leagueData.sport);

      for(i=0; i < leagues.length; i++) {
        let leagueName = ProLeagues.getLeagueName(leagues[i]);
        let isChecked = false;
        let index = that.props.leagueData.pro_leagues.indexOf(leagues[i]);

        if(index > -1) {
          isChecked = true;
        }

        proLeagueOptions.push(
          <div className="column6">
            <Checkbox
              label={leagueName}
              labelStyle={{ fontSize: "0.8em"}}
              inputStyle={{ borderColor: "#aaa" }}
              onCheck={that.handleProLeagueSelectionChange.bind(that)}
              value={leagues[i]}
              checked={isChecked}
            />
          </div>
        );
      }
    }

    return (
      <div className="column12">
        <span className="title">League Setup</span>
        <p className="subtext">Let's get started by entering some basic information about your fantasy league.</p>

        <div className="column12">
          <div className="column6">
            <TextField
              onChange={that.handleFantasyLeagueNameChange.bind(that)}
              floatingLabelText="Fantasy League Name"
              fullWidth={true}
              value={ that.props.leagueData.fleague_name !== "" ? that.props.leagueData.fleague_name : null } />
          </div>
        </div>

        <div className="column12">
          <div className="column6">
            <SelectField
              value={ that.props.leagueData.sport !== "" ? that.props.leagueData.sport : null }
              onChange={that.handleSportChange.bind(that)}
              floatingLabelText="Sport"
            >
              {sportOptions}
            </SelectField>
          </div>

          <div className="column6">
            <SelectField
              value={ that.props.leagueData.contest_type !== "" ? that.props.leagueData.contest_type : null }
              onChange={that.handleFantasyLeagueTypeChange.bind(that)}
              floatingLabelText="Fantasy League Type"
            >
              {contestTypeOptions}
            </SelectField>
          </div>

        </div>

        <div className="column6">
          {proLeagueOptions}
        </div>

      </div>
    )
  }
}
