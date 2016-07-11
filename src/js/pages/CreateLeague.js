import React from "react";
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';

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
      dialogOpen          : false,
      dialogMessage       : "",
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
    if(admin) admins[admin] = 'admin';

    leagueData.fleague_admins = admins;

    this.setState({
      leagueData: leagueData
    });
  }

  nextStep() {
    if(this.state.stepIndex >=2) {
      // finish case
      this.createLeague();
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

  validateEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      return false;
    } else {
      return true;
    }
  }

  verifyData() {
    // league data
    if(!this.state.leagueData.fleague_name) {
      this.setState({
        dialogMessage: "You must choose a fantasy league name before continuing."
      });
      return false;
    } else if(!this.state.leagueData.sport || this.state.leagueData.pro_leagues.length === 0) {
      this.setState({
        dialogMessage: "You must choose a fantasy sport and professional leagues before continuing."
      });
      return false;
    } else if(!this.state.leagueData.contest_type) {
      this.setState({
        dialogMessage: "You must choose a fantasy league type before continuing."
      });
      return false;
    } else if(!this.state.leagueData.sport || !this.state.leagueData.pro_leagues) {
      this.setState({
        dialogMessage: "You must choose a fantasy sport and professional leagues before continuing."
      });
      return false;
    }

    // email invites
    let i=0;
    let emailList = this.state.emailList;
    for(; i < emailList.length; i++) {
      if(emailList[i] !== "" && !this.validateEmail(emailList[i])) {
        this.setState({
          dialogMessage: "One or more emails you've entered are invalid. Please fix this before continuing."
        });
        return false;
      }
    }

    return true;

  }

  createLeague() {
    // verify data is valid
    if(!this.verifyData()) {
      this._handleDialogOpen();
      return;
    }

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/create",
      data: {
        fleague_name          : this.state.leagueData.fleague_name,
        fleague_admins        : this.state.leagueData.fleague_admins,
        sport                 : this.state.leagueData.sport,
        pro_leagues           : this.state.leagueData.pro_leagues,
        contest_type          : this.state.leagueData.contest_type,
        privacy_mode          : this.state.leagueData.privacy_mode,
        league_size_limit     : this.state.leagueData.league_size_limit,
        league_start_dateTime : this.state.leagueData.league_start_dateTime,
        status                : this.state.leagueData.status,
        settings              : this.state.leagueData.settings
      }
    }).then((resp) => {
      if (resp.success) {
        // send invites
        this.sendInvites(resp.league.fleague_id);

        FantasyLeagueActions.setActiveFantasyLeague(resp.league);
        FantasyLeagueActions.addLeagueToMyLeagues(resp.league);
        this.props.history.push("/fantasyLeague/" + resp.league.fleague_id + "/dashboard");
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

  sendInvites(fleagueId) {
    let emailList = this.state.emailList;

    // remove any empty entries
    let filterFunction = function(value) {
      return value !== "";
    }

    let filteredEmailList = emailList.filter(filterFunction);

    if(filteredEmailList.length === 0) {
      return;
    }

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/invite",
      data: {
        fleague_id  : fleagueId,
        emails   : filteredEmailList
      }
    }).then((resp) => {
      if (resp.success) {
      }
      else {
        alert("invitation failed");
        console.log("invitation failed", resp);
      }
    }).catch((error) => {
      alert("invitation errored");
      console.log("invitation errored", error);
    });
  }

  render() {
    let that = this;

    const actions = [
      <button
        className="btn simpleGreenBtn brightBackground"
        onClick={this._handleDialogClose.bind(that)} >
        Close
      </button>
    ];

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

          <Dialog
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this._handleDialogClose}
          >
            {this.state.dialogMessage}
          </Dialog>

        </div>

      </MuiThemeProvider>
    );
  }
}
