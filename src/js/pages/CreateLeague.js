import React from "react";
import Setup from "../components/fantasyLeague/creation/Setup";
import AddUsers from "../components/fantasyLeague/AddUsers";
import * as auth from "../scripts/PersistentUser";
import * as activeView from "../scripts/ActiveView";
import moment from "moment";

export default class CreateLeague extends React.Component {
  constructor() {
    super()

    let adminEmail = auth.getLoggedInUserEmail();

    this.state = {
      step            : 1,
      inviteEmails    : [""],
      fleague_name    : null,
      fleague_admins  : [adminEmail],
      sport           : "Basketball",
      pro_leagues     : [],
      contest_type    : "League",
      privacy_mode    : "public",
      league_size     : 3,
      draft_date      : moment(),
      draft_time      : null,
      settings        : { draft_mode : "auto" }
    };
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  prevStep() {
    this.setState({
      step: this.state.step - 1
    });
  }

  handleFantasyLeagueNameChange(e) {
    this.setState({
      fleague_name : e.target.value
    });
  }

  handleProLeagueSelection(e) {
    let leagueList = this.state.pro_leagues;
    let league = e.target.value;
    let index = leagueList.indexOf(league);

    if(index >= 0) {
      leagueList.splice(index, 1);
    }
    else {
      leagueList.push(league);
    }

    this.setState({
      pro_leagues: leagueList
    });
  }

  handlePrivacyChange(e) {
    this.setState({
      privacy_mode: e.target.value
    });
  }

  handleLeagueSizeChange(e) {
    this.setState({
      league_size: e.target.value
    })
  }

  handleDraftDateChange(date) {
    this.setState({
      draft_date: date
    });
  }

  handleDraftTimeChange(time) {
    this.setState({
      draft_time: time
    });
  }

  handleInvitesChange(e) {
    let emailList = this.state.inviteEmails;

    if(e.target.dataset.index) {
      emailList[e.target.dataset.index] = e.target.value;

      this.setState({
        inviteEmails: emailList
      });
    }
  }

  addBlankInvite() {
    let emailList = this.state.inviteEmails;
    emailList.push("");

    this.setState({
      inviteEmails: emailList
    });
  }

  removeInvite(e) {
    let emailList = this.state.inviteEmails;

    if(e.target.dataset.index && this.state.inviteEmails.length > 1) {
      emailList.splice(e.target.dataset.index, 1);

      this.setState({
        inviteEmails: emailList
      });
    }
  }

  createLeague() {
    // TODO: actually make call
    let leagueId = 1234; // temp value for testing
    console.log("create league call goes here");
    activeView.setActiveViewingLeague(this.state.fleague_name);
    this.props.history.push("/fantasyLeague/dashboard");
  }

  render() {
    return (
      <div className="darkContainer padBottom">

        <div className="containerBanner">
          <div className="title">Create Fantasy League</div>
        </div>

        <div className="popupDark wide">
          {(() => {
            switch (this.state.step) {
        			case 1: return <Setup state={this.state}
                                    nextStep={this.nextStep.bind(this)}
                                    handleFantasyLeagueNameChange={this.handleFantasyLeagueNameChange.bind(this)}
                                    handleProLeagueSelection={this.handleProLeagueSelection.bind(this)}
                                    handlePrivacyChange={this.handlePrivacyChange.bind(this)}
                                    handleLeagueSizeChange={this.handleLeagueSizeChange.bind(this)}
                                    handleDraftDateChange={this.handleDraftDateChange.bind(this)}
                                    handleDraftTimeChange={this.handleDraftTimeChange.bind(this)} />

              case 2: return <AddUsers createLeague={this.createLeague.bind(this)}
                                       prevStep={this.prevStep.bind(this)}
                                       state={this.state}
                                       handleInvitesChange={this.handleInvitesChange.bind(this)}
                                       addBlankInvite={this.addBlankInvite.bind(this)}
                                       removeInvite={this.removeInvite.bind(this)} />
        		}
          })()}
        </div>

      </div>
    );
  }
}
