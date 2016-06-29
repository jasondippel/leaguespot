import React from "react";
import UserStore from "../stores/UserStore";
import * as FantasyLeagueActions from "../actions/FantasyLeagueActions";
import Setup from "../components/fantasyLeague/creation/Setup";
import AddUsers from "../components/fantasyLeague/AddUsers";
import * as activeView from "../scripts/ActiveView";
import APIRequest from "../scripts/APIRequest";
import moment from "moment";

export default class CreateLeague extends React.Component {
  constructor() {
    super();
    let admin = UserStore.getEmail();

    this.state = {
      step                : 1,
      inviteEmails        : [""],
      fleague_name        : null,
      fleague_admins      : { admin : "admin"},
      sport               : "Basketball",
      pro_leagues         : [],
      contest_type        : "League",
      privacy_mode        : "public",
      league_size_limit   : 3,
      draft_date          : null,
      draft_time          : null,
      status              : "in progress",
      settings            : { draft_mode : "auto" }
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
    this.setState({
      fleague_admins: { admin : "admin"}
    });
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
      league_size_limit: e.target.value
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

              case 2: return <div>dis page be in flux yo</div>
        		}
          })()}
        </div>

      </div>
    );
  }
}
