/**
 * Dashboard for a given fantasy league
 * @urlParams
 * @param :id - the id of the fantasy league to display
 *
 */

/* Style Dependencies */
import './Dashboard.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import { fetchActiveFantasyLeague } from '../../../actions/FantasyLeagueActions';
import FlatButton from '../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../../components/banners/SmallBanner';
import MenuBar from '../../../components/menuBar/MenuBar';


class Dashboard extends React.Component {
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

  getMenuBarItems() {
    return [
      (
        <Link to='#'>
          My Roster
        </Link>
      ),
      (
        <Link to='#'>
          Standings
        </Link>
      ),
      (
        <Link to='#'>
          Free Agents
        </Link>
      ),
      (
        <Link to='#'>
          Rules & Info
        </Link>
      )
    ];
  }

  render() {
    if (!this.state.fantasyLeague || this.state.fantasyLeague.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    let menuItems = this.getMenuBarItems();

    return (
      <div className='rc-Dashobard'>
        <SmallBanner
          title={this.state.fantasyLeague.fleague_name}
          />
        <MenuBar items={menuItems}/>

        <div className='content'>
          stuff goes here...
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Dashboard)
