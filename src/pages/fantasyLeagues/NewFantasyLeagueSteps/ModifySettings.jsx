/**
 * Step 2: modify defaults for start date and other rules
 */

/* Style Dependencies */
import './NewFantasyLeagueSteps.less';

/* Script Dependencies */
import React from 'react';
import Section from '../../../leaguespot-components/components/containers/Section';
import TextField from '../../../leaguespot-components/components/inputs/text/TextField';
import SmallBanner from '../../../components/banners/SmallBanner';


export default class ModifySettings extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div className='stepContent'>
        <Section>
          Modify settings content...
        </Section>
      </div>
    );
  }
}
