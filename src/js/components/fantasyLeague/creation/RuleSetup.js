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

export default class RuleSetup extends React.Component {
  constructor() {
    super()
  }


  render() {
    let that = this;

    return (
      <div className="column12">

        <span className="title">League Rules and Dates</span>
        <p className="subtext">Time to get into the details! Feel free to change the defaults below and customize your fantasy league to make it work how you want.</p>

      </div>
    )
  }
}
