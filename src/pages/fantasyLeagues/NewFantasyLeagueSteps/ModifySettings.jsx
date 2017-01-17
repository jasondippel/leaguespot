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

    this.state = {

    };
  }

  onSuggestSelect(location) {
    console.log('selected location:', location);
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
                />
            </div>
            <div className='column6'>
              <TimePicker
                floatingLabelFixed={true}
                floatingLabelText='Cutoff time'
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
              />
          </div>

        </Section>
      </div>
    );
  }
}
