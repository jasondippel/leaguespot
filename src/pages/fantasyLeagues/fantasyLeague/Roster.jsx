/**
 * Roster for a given fantasy league
 */

/* Style Dependencies */
import './Roster.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import { Sanitize } from '../../../utils/Sanitize';
import { fetchActiveFantasyLeague } from '../../../actions/FantasyLeagueActions';
import FlatButton from '../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../leaguespot-components/components/buttons/RaisedButton';


class Roster extends React.Component {
  constructor() {
    super();

    this.state = {
      fantasyLeague: null
    }

    store.subscribe(() => {
      this.setState({
        fantasyLeague: store.getState().fantasyLeague.activeFantasyLeague
      });
    });

  }

  componentWillMount() {
    // fetch active fantasy league
    this.props.dispatch(fetchActiveFantasyLeague(this.props.params.id));
  }

  componentWillReceiveProps(newProps) {
    if(this.state.fantasyLeague && this.state.fantasyLeague.fleague_id === newProps.params.id) {
      return;
    }

    this.props.dispatch(fetchActiveFantasyLeague(newProps.params.id));
  }

  render() {
    if (!this.state.fantasyLeague || this.state.fantasyLeague.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className='rc-Roster'>

        <div className='content'>
          <h2>Roster</h2>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Roster)
