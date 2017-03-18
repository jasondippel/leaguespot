/**
 * Step 1: Set basic league information
 */

/* Style Dependencies */
import './NewFantasyLeagueSteps.less';

/* Script Dependencies */
import React from 'react';
import Section from '../../../leaguespot-components/components/containers/Section';
import TextField from '../../../leaguespot-components/components/inputs/text/TextField';
import SmallBanner from '../../../components/banners/SmallBanner';
import SelectField from '../../../leaguespot-components/components/inputs/selectors/SelectField';
import Option from '../../../leaguespot-components/components/inputs/selectors/Option';
import CheckBox from '../../../leaguespot-components/components/inputs/switches/CheckBox';
import * as leagueInfo from '../../../utils/ProLeagues';

export default class SetupBasics extends React.Component {
  constructor() {
    super();
  }

  renderSportOptions() {
    let sports = leagueInfo.getSports();
    let sportsItems = [];

    sportsItems = sports.map((sport, key) => {
      return (
        <Option key={key} value={sport} primaryText={sport} />
      );
    });

    return sportsItems;
  }

  renderLeagueOptions() {
    if (!this.props.sport) {
      return (
        <div className='notificationText'>
          Select a sport to see league options
        </div>
      );
    }

    let leagueOptions = [];
    let allLeagues = leagueInfo.getLeaguesInSport(this.props.sport);
    leagueOptions = allLeagues.map((leagueId, key) => {
      let leagueName = leagueInfo.getLeagueName(leagueId);
      let isChecked = this.props.proLeagues.indexOf(leagueId) >= 0;

      return (
        <CheckBox
          key={key}
          label={leagueName}
          value={leagueId}
          checked={isChecked}
          onChange={this.props.handleProLeaguesChange}
          />
      );
    });

    return leagueOptions;
  }

  render() {
    let sportsOptions = this.renderSportOptions(),
        leagueOptions = this.renderLeagueOptions();

    return (
      <div className='stepContent'>
        <Section padContent={true} >
          <div className='column6'>
            <TextField
              floatingLabelFixed={true}
              floatingLabelText='Fantasy League Name'
              hintText='name'
              fullWidth={true}
              value={this.props.name}
              onChange={this.props.handleNameChange}
              />
          </div>
          <div className='column6'></div>
          <div className='column4'>
            <SelectField
              items={sportsOptions}
              hintText='select a sport...'
              floatingLabelFixed={true}
              floatingLabelText='Sport'
              onChange={this.props.handleSportChange}
              value={this.props.sport}
              />
          </div>
          <div className='column8'>
            <div className='proLeaguesTitle'>
              Professional Leagues
            </div>
            { leagueOptions }
          </div>
        </Section>
      </div>
    );
  }
}
