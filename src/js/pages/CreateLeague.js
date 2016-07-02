import React from "react";
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';

import UserStore from "../stores/UserStore";
import * as FantasyLeagueActions from "../actions/FantasyLeagueActions";
import LeagueSetup from "../components/fantasyLeague/creation/LeagueSetup";
import RuleSetup from "../components/fantasyLeague/creation/RuleSetup";
import UserInviteList from "../components/fantasyLeague/UserInviteList";
import APIRequest from "../scripts/APIRequest";
import moment from "moment";

export default class CreateLeague extends React.Component {
  constructor() {
    super();
    let admin = UserStore.getEmail();

    // default start dateTime
    let startDateTime = moment().add(1, 'days').hour(12).minute(30).second(0);

    this.state = {
      stepIndex           : 0,
      emailList           : [""],
      leagueData          : {
        fleague_name           : null,
        fleague_admins         : {},
        sport                  : "",
        pro_leagues            : [],
        contest_type           : "",
        privacy_mode           : "public",
        league_size_limit      : 5,
        league_start_dateTime  : startDateTime.toDate(),
        status                 : "in progress",
        settings               : { draft_mode : "auto" }
      }
    };
  }

  componentWillMount() {
    UserStore.on("change", this.setAdminUser.bind(this));
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.setAdminUser.bind(this));
  }

  setAdminUser() {
    let admin = UserStore.getEmail();
    let leagueData = this.state.leagueData;
    let admins = {};
    if(admin) admin[admin] = 'admin';

    leagueData.fleague_admins = admins;

    this.setState({
      leagueData: leagueData
    });
  }

  nextStep() {
    if(this.state.stepIndex >=2) {
      // finish case
      return;
    }

    this.setState({
      stepIndex: this.state.stepIndex + 1
    });
  }

  prevStep() {
    this.setState({
      stepIndex: this.state.stepIndex - 1
    });
  }

  handleFantasyLeagueNameChange(value) {
    let leagueData = this.state.leagueData;
    leagueData.fleague_name = value;

    this.setState({
      leagueData: leagueData
    });
  }

  handleSportChange(sport) {
    let leagueData = this.state.leagueData;
    leagueData.sport = sport;

    this.setState({
      leagueData: leagueData
    });
  }

  handleProLeagueSelectionChange(league, isChecked) {
    let leagueData = this.state.leagueData;
    let leagueList = leagueData.pro_leagues;
    let index = leagueList.indexOf(league);

    if(index >= 0) {
      leagueList.splice(index, 1);
    }
    else {
      leagueList.push(league);
    }

    leagueData.pro_leagues = leagueList;
    this.setState({
      leagueData: leagueData
    });
  }

  handleFantasyLeagueTypeChange(type) {
    let leagueData = this.state.leagueData;
    leagueData.contest_type = type;

    this.setState({
      leagueData: leagueData
    });
  }

  handlePrivacyChange(value) {
    let leagueData = this.state.leagueData;
    leagueData.privacy_mode = value;

    this.setState({
      leagueData: leagueData
    });
  }

  handleLeagueSizeChange(value) {
    let leagueData = this.state.leagueData;
    leagueData.league_size_limit = value;

    this.setState({
      leagueData: leagueData
    });
  }

  handleUserEmailChange(newEmailList) {
    this.setState({
      emailList: newEmailList
    });
  }

  handleStartDateChange(date) {
    let leagueData = this.state.leagueData;
    let oldDateTime = leagueData.league_start_dateTime;

    // create new dateTime; restore old selected time
    let newDateTime = moment(date);
    newDateTime = moment(newDateTime).hour(moment(oldDateTime).hour());
    newDateTime = moment(newDateTime).minute(moment(oldDateTime).minute());
    newDateTime = moment(newDateTime).second(moment(oldDateTime).second());

    leagueData.league_start_dateTime = moment(newDateTime).toDate();

    this.setState({
      leagueData: leagueData
    });
  }

  handleStartTimeChange(time) {
    let leagueData = this.state.leagueData;
    let oldDateTime = leagueData.league_start_dateTime;

    // create new dateTime; restore old selected date
    let newDateTime = moment(time);
    newDateTime = moment(newDateTime).day(moment(oldDateTime).day())
    newDateTime = moment(newDateTime).month(moment(oldDateTime).month())
    newDateTime = moment(newDateTime).year(moment(oldDateTime).year());

    leagueData.league_start_dateTime = moment(newDateTime).toDate();

    this.setState({
      leagueData: leagueData
    });
  }

  getStepContent() {
    switch (this.state.stepIndex) {
      case 0:
      return (
        <div className="column12">
          <LeagueSetup
            leagueData={this.state.leagueData}
            handleFantasyLeagueNameChange={this.handleFantasyLeagueNameChange.bind(this)}
            handleSportChange={this.handleSportChange.bind(this)}
            handleProLeagueSelectionChange={this.handleProLeagueSelectionChange.bind(this)}
            handleFantasyLeagueTypeChange={this.handleFantasyLeagueTypeChange.bind(this)} />
        </div>
      );
      case 1:
        return (
          <div className="column12">
            <RuleSetup
              leagueData={this.state.leagueData}
              handlePrivacyChange={this.handlePrivacyChange.bind(this)}
              handleLeagueSizeChange={this.handleLeagueSizeChange.bind(this)}
              handleStartDateChange={this.handleStartDateChange.bind(this)}
              handleStartTimeChange={this.handleStartTimeChange.bind(this)} />
          </div>
        );
      case 2:
        return (
          <div className="column12">
            <UserInviteList
              emailList={this.state.emailList}
              handleUserEmailChange={this.handleUserEmailChange.bind(this)} />
          </div>
        );
      default:
        return 'How did you get here? Please stay within the sandbox';
    }
  }

  createLeague() {
    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/create",
      data: {
        fleague_name        : this.state.fleague_name,
        fleague_admins      : this.state.fleague_admins,
        sport               : this.state.sport,
        pro_leagues         : this.state.pro_leagues,
        contest_type        : this.state.contest_type,
        privacy_mode        : this.state.privacy_mode,
        league_size_limit   : this.state.league_size_limit,
        // draft_date          : this.state.draft_date,
        // draft_time          : this.state.draft_time,
        status              : this.state.status,
        settings            : this.state.settings
      }
    }).then((resp) => {
      if (resp.success) {
        FantasyLeagueActions.setActiveFantasyLeague(resp.league);
        this.props.history.push("/fantasyLeague/dashboard/" + resp.league.fleague_id);
      }
      else {
        alert("creation failed");
        console.log("creation failed", resp);
      }
    }).catch((error) => {
      alert("creation errored ");
      console.log("creation errored", error);
    });
  }

  render() {
    let that = this;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>

        <div className="darkContainer">

          <div className="column12 leagueBanner">
            <div className="column8">
              <span className="title">Create Fantasy League</span>
            </div>
            <div className="column4 right" style={{paddingTop: "1.5em"}}>
            </div>
          </div>

          <div className="column2"></div>

          <div className="column8">
            <div className="column12">
              <Stepper activeStep={that.state.stepIndex} linear={false} style={{color: '#fff'}} >
                <Step>
                  <StepButton
                    onClick={() => this.setState({stepIndex: 0})} >
                    <span style={{color: '#fff'}}>Setup League Basics</span>
                  </StepButton>
                </Step>
                <Step>
                  <StepButton
                    onClick={() => this.setState({stepIndex: 1})} >
                    <span style={{color: '#fff'}}>Modify League Rules & Dates</span>
                  </StepButton>
                </Step>
                <Step>
                  <StepButton
                    onClick={() => this.setState({stepIndex: 2})} >
                    <span style={{color: '#fff'}}>Invite Users</span>
                  </StepButton>
                </Step>
              </Stepper>
            </div>

            <div className="column12 standardContainer grey">
              {this.getStepContent()}
            </div>

            <div className="column12 padTopSmall right">
              <button
                className="btn greenSolidBtn"
                onClick={that.prevStep.bind(that)}
                disabled={that.state.stepIndex === 0 ? true : false}
                >
                Back
              </button>
              <button
                className="btn greenSolidBtn"
                onClick={that.nextStep.bind(that)}
                >
                {that.state.stepIndex === 2 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>

          <div className="column2"></div>

        </div>

      </MuiThemeProvider>
    );
  }
}
