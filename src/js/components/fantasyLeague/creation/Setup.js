import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import TimePickerLocale from 'rc-time-picker/lib/locale/en_US';
import moment from "moment";
import APIRequest from "../../../scripts/APIRequest";

export default class Setup extends React.Component {
  constructor() {
    super()
  }

  verifyData() {
    return true;
  }

  render() {

    return (
      <div className="form formDark">

      <div className="row">
        <label>League Name</label>
        <input type="text" className="noPadding column7"
          placeholder="Enter League Name"
          value={this.props.state.fleague_name}
          onChange={this.props.handleFantasyLeagueNameChange} />
      </div>

        <div className="column column9">
          <div className="row">
            <label>Sport</label>
            <div className="formObject buttonGroup flow">
              <button className="btn greenOutlineBtn active column3">Basketball</button>
              <button className="btn greenOutlineBtn disabled column3" disabled>Hockey</button>
              <button className="btn greenOutlineBtn disabled column3" disabled>Soccer</button>
            </div>
          </div>

          <div className="row">
            <label>Leagues Included</label>
            <div className="formObject buttonGroup flow">
              <button
                className={
                  this.props.state.pro_leagues.includes("nba") ?
                    "btn greenOutlineBtn column2 active" :
                    "btn greenOutlineBtn column2"
                }
                onClick={this.props.handleProLeagueSelection}
                value="nba">
                NBA
              </button>
              <button className={
                  this.props.state.pro_leagues.includes("wnba") ?
                    "btn greenOutlineBtn column2 active" :
                    "btn greenOutlineBtn column2"
                }
                onClick={this.props.handleProLeagueSelection}
                value="wnba">
                WNBA
              </button>
              <button className={
                  this.props.state.pro_leagues.includes("ncaa_mb") ?
                    "btn greenOutlineBtn column2 active" :
                    "btn greenOutlineBtn column2"
                }
                onClick={this.props.handleProLeagueSelection}
                value="ncaa_mb">
                NCAA MB
              </button>
              <button className={
                  this.props.state.pro_leagues.includes("ncaa_wb") ?
                    "btn greenOutlineBtn column2 active" :
                    "btn greenOutlineBtn column2"
                }
                onClick={this.props.handleProLeagueSelection}
                value="ncaa_wb">
                NCAA WB
              </button>
            </div>
          </div>

          <div className="row">
            <label>Contest Type</label>
            <div className="formObject buttonGroup">
              <button className="btn greenOutlineBtn active column3">League</button>
              <button className="btn greenOutlineBtn disabled column3" disabled>Weekly</button>
              <button className="btn greenOutlineBtn disabled column3" disabled>Head-to-Head</button>
            </div>
          </div>

          <div className="row">
            <label>Privacy</label>
            <div className="formObject buttonGroup">
              <button className={
                  this.props.state.privacy_mode === "public" ?
                    "btn greenOutlineBtn column3 active" :
                    "btn greenOutlineBtn column3"
                }
                onClick={this.props.handlePrivacyChange}
                value="public">
                Public
              </button>
              <button className={
                  this.props.state.privacy_mode === "private" ?
                    "btn greenOutlineBtn column3 active" :
                    "btn greenOutlineBtn column3"
                }
                onClick={this.props.handlePrivacyChange}
                value="private">
                Private
              </button>
            </div>
          </div>
        </div>

        <div className="column column3">
          <div className="row">
            <label>League Size</label>
            <input type="text" className="noPadding column12" ref="city"
              value={this.props.state.league_size}
              onChange={this.props.handleLeagueSizeChange} />
          </div>

          <div className="row">
            <label>Draft Date</label>
            <DatePicker
              selected={this.props.state.draft_date}
              onChange={this.props.handleDraftDateChange}
              className="noPadding column12"
              dateFormat="YYYY/MM/DD" />
          </div>

          <div className="row">
           <label>Draft Time</label>
           <TimePicker
             showSecond={false}
             locale={TimePickerLocale}
             placeholder={"Select Time"}
             value={this.props.state.draft_time}
             className="noPadding column12"
             onChange={this.props.handleDraftTimeChange}
              />
          </div>
        </div>

        <div className="row right">
          <button className="btn submit" onClick={this.props.nextStep}>Next</button>
        </div>

      </div>
    );
  }
}
