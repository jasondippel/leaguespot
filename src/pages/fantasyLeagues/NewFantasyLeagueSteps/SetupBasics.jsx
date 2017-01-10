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


export default class SetupBasics extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div className='stepContent'>
          Setup basics content...
      </div>
    );
  }
}
