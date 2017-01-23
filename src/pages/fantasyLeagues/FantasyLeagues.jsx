/**
 * Summary of fantasy leagues a user belongs to. Can be used as a place to
 * to search for fantasy leagues or create a new one.
 */

/* Style Dependencies */
import './FantasyLeagues.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../store';
import { fetchMyFantasyLeagues } from '../../actions/FantasyLeagueActions';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../components/banners/SmallBanner';


class FantasyLeagues extends React.Component {
  constructor() {
    super();

    store.subscribe(() => {
      this.setState({
        fantasyLeague: store.getState().fantasyLeague
      });
    });

  }

  componentWillMount() {
    // fetch all of user's fantasy leagues
    this.props.dispatch(fetchMyFantasyLeagues());
  }

  render() {
    return (
      <div className='rc-FantasyLeagues'>
        <SmallBanner
          title='Fantasy Leagues'
          showButton={true}
          button={(
            <Link to='/fantasy-leagues/new-fantasy-league'>
              <RaisedButton
                label='New League'
                type='primary'
                />
            </Link>
          )}
          />

        <div className='content'>
          list of my leagues (cards: name, teams, position, image)<br/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(FantasyLeagues)
