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
import CheckBox from '../../../leaguespot-components/components/inputs/switches/CheckBox';

export default class SetupBasics extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='stepContent'>
        <Section>
          <div className='column6'>
            <TextField
              floatingLabelFixed={true}
              floatingLabelText='Fantasy League Name'
              hintText='name'
              fullWidth={true}
              />
          </div>
          <div className='column6'></div>
          <div className='column4'>
            <SelectField
              items={this.props.sportsOptions}
              hintText='Select a sport...'
              floatingLabelFixed={true}
              floatingLabelText='Sport'
              />
          </div>
          <div className='column8'>
            <div className='proLeaguesTitle'>
              Professional Leagues
            </div>
            <CheckBox label='NHL' checked={true} />
            <CheckBox label='OHL' checked={true} />
            <CheckBox label='NWHL' checked={true} />
          </div>
        </Section>
      </div>
    );
  }
}
