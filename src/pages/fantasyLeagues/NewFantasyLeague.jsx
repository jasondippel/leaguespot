/**
 * Form to create a new fantasy league
 */

/* Style Dependencies */
import './NewFantasyLeague.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../components/banners/SmallBanner';


export default class NewFantasyLeague extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-NewFantasyLeague'>
        <SmallBanner
          title='New Fantasy League'
          />

        <div className='content'>
          stepper like in old design
        </div>
      </div>
    );
  }
}
