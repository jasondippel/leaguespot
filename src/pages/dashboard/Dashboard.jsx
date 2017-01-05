/**
 * Header used in Layout. Contains NavBar and logo link
 */

 /* Style Dependencies */
 import './Dashboard.less';

 /* Script Dependencies */
 import React from 'react';
 import { Link } from 'react-router';
 import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
 import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
 // import FlatButton from 'leaguespot-components'; // TODO: figure out why import doesn't work from leaguespot-components module


export default class Dashboard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-Dashboard'>
        This is the dashboard. Stuff should go here...
      </div>
    );
  }
}
