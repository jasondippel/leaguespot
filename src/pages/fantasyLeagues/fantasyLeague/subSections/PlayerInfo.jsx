/**
 * Welcome/About standard page
 */

/* Style Dependencies */
import './PlayerInfo.less';
import colours from '../../../../leaguespot-components/constants/colours';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { Sanitize } from '../../../../utils/Sanitize';
import * as leagueInfo from '../../../../utils/ProLeagues';
import FlatButton from '../../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../../leaguespot-components/components/buttons/RaisedButton';
import Section from '../../../../leaguespot-components/components/containers/Section';
import Icon from '../../../../leaguespot-components/components/icons/Icon';


export default class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
      sport: props.sport
    }
  }

  renderPlayerStats() {
    let fields = leagueInfo.getAllPlayerStats(this.state.sport);
    let stats = fields.map((stat) => {
      let value = this.state.player[stat];

      if (value) {
        return (
          <div className='stat' key={stat}>
            <div className='label'>{leagueInfo.getShortFormForStat(stat)}</div>
            <div className='value'>{value}</div>
          </div>
        );  
      }
    });

    return stats;
  }

  renderPersonalInfo() {
    let fields = leagueInfo.getPersonalInfoStats(this.state.sport);
    let hometown = this.state.player.hometown;
    let state = this.state.player.homeprov;
    let country = this.state.player.homecntry;

    if (state) {
      if (hometown) {
        hometown = hometown + ', ' + state;
      } else {
          hometown = state;
      }
    }

    if (country) {
      if (hometown) {
        hometown = hometown + ', ' + country;
      } else {
        hometown = country;
      }
    }

    if (!hometown) {
      hometown = 'n/a';
    }

    let formatedStats = fields.map((stat) => {
      let value = this.state.player[stat]
      if (stat === 'league') {
        value = leagueInfo.getLeagueName(value);
      } else if (stat === 'cost') {
        value = '$' + value;
      }

      return (
        <div className='column6 stat' key={stat}>
          <div className='label'>{leagueInfo.getNameForPersonalInfoStat(stat)}</div>
          <div className='value'>{value}</div>
        </div>
      );
    })

    return (
      <div>
        <div className='column6 stat'>
          <div className='label'>Hometown</div>
          <div className='value'>{hometown}</div>
        </div>
        <div className='column6 stat'>
          <div className='label'>Birthday</div>
          <div className='value'>{this.state.player.birthdate ? this.state.player.birthdate : 'n/a'}</div>
        </div>
        {formatedStats}
      </div>
    )
  }

  render() {
    let personalInfo = this.renderPersonalInfo();
    let playerStats = this.renderPlayerStats();

    return (
      <div className='rc-PlayerInfo'>
        <div className='personalInfo'>
          <div className='image column3'>
            <Icon type='account-box' color={colours.darkTextSecondary} paddingLeft='0.5em' paddingRight='0.5em' height={120} width={120} />
          </div>
          <div className='info column9'>
            {personalInfo}
          </div>
        </div>

        <div className='playerStats'>
          {playerStats}
        </div>
      </div>
    );
  }
}

PlayerInfo.displayName = 'PlayerInfo';

const {any, bool, func, number, object, string} = React.PropTypes;

PlayerInfo.propTypes = {
  player: object.isRequired,
  sport: string.isRequired
};

PlayerInfo.defaultProps = {
};
