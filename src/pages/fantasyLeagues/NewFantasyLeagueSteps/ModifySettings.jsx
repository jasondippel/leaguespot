/**
 * Step 2: modify defaults for start date and other rules
 */

/* Style Dependencies */
import './NewFantasyLeagueSteps.less';

/* Script Dependencies */
import React from 'react';
import GeoInput from '../../../leaguespot-components/components/inputs/geoInput/GeoInput';
import Section from '../../../leaguespot-components/components/containers/Section';
import TextField from '../../../leaguespot-components/components/inputs/text/TextField';
import DatePicker from '../../../leaguespot-components/components/datePicker/DatePicker';
import TimePicker from '../../../leaguespot-components/components/timePicker/TimePicker';
import SmallBanner from '../../../components/banners/SmallBanner';


export default class ModifySettings extends React.Component {
  constructor() {
    super();

    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  onSuggestSelect(location) {
    this.props.handleHometownChange(location.label);
  }

  render() {
    return (
      <div className='stepContent'>
        <Section>
          <div className='column12 dataSection'>
            <div className='dataDetails'>
              <span className='title'>Cutoff date</span>
              The final date users in the league will have to draft their roster. If a user has not drafted it by this point, the user is automatically removed from the league.
            </div>
            <div className='column6'>
              <DatePicker
                floatingLabelFixed={true}
                floatingLabelText='Cutoff date'
                value={this.props.cutOffDate}
                onChange={this.props.handleCutOffDateChange}
                />
            </div>
            <div className='column6'>
              <TimePicker
                floatingLabelFixed={true}
                floatingLabelText='Cutoff time'
                value={this.props.cutOffDate}
                onChange={this.props.handleCutoffTimeChange}
                />
            </div>
          </div>
          <div className='column12 dataSection'>
            <div className='dataDetails'>
              <span className='title'>Max roster size</span>
              The number of players a user will be required to have on their team. The default is the maximum size you can have. It is recommened to have no fewer than a full line for the respective sport.
            </div>
            <TextField
              floatingLabelFixed={true}
              floatingLabelText='Max roster size'
              hintText='name'
              value={this.props.maxRosterSize}
              multiLine={true}
              onChange={this.props.handleMaxRosterSizeChange}
              />
          </div>
          <div className='column12 dataSection'>
            <div className='dataDetails'>
              <span className='title'>Hometown</span>
              If one is selected, players from that city will earn bonus points in your fantasy league.
            </div>
            <GeoInput
              floatingLabelFixed={true}
              floatingLabelText='Hometown'
              onSuggestSelect={this.onSuggestSelect}
              types={['(cities)']}
              initialValue={this.props.hometown}
              value={this.props.hometown}
              />
          </div>
          <div className='column12 dataSection'>
            <div className='dataDetails'>
              <span className='title'>Other Rules</span>
              You may enter a paragraph below outlining other rules to be followed in your fantasy league. It is each players responsibility to ensure they follow these rules.
            </div>
            <TextField
              floatingLabelFixed={true}
              floatingLabelText='Other rules'
              hintText='eg. Must have at least 1 male and 1 female on active roster, ...'
              value={this.props.socialRules}
              fullWidth={true}
              multiLine={true}
              onChange={this.props.handleSocialRulesChange}
              />
          </div>

        </Section>
      </div>
    );
  }
}
