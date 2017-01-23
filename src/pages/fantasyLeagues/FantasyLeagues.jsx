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

    this.state = {
      fantasyLeague: null
    }

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

  getBackgroundImageLink(sport) {
    switch (sport) {
      case 'Basketball':{
        return 'src/img/basketball_court.jpg'
      }
      case 'Hockey': {
        return 'src/img/hockey_rink.jpg';
      }
      default:
        return 'src/img/stadium-bw.jpg';
    }
  }

  renderFantasyLeagueCard(fantasyLeague, key) {
    let imageLink = this.getBackgroundImageLink(fantasyLeague.sport);

    return (
      <div className='card column4' key={key}>
        <div className='rc-FantasyLeagueCard'>
          <div className='banner'>
            <img className='bannerImage' src={imageLink} />
            <span className='title'>{fantasyLeague.fleague_name}</span>
            <div className='buttons'>
              <RaisedButton
                label='Enter'
                shaddow={true}
                />
            </div>
          </div>

          <div className='content'>
            <div className='column6'>
              <span className='title'>Sport: </span>{fantasyLeague.sport}
            </div>
            <div className='column6'>
              <span className='title'>Status: </span><span className={fantasyLeague.status + ' status'}>{fantasyLeague.status}</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  render() {
    // this.state.fantasyLeague.myFantasyLeagues.map(this.renderFantasyLeagueCard, this)
    let fantasyLeagueCards;
    if (!this.state.fantasyLeague || this.state.fantasyLeague.isLoading) {
      fantasyLeagueCards = (
        <div>
          Loading...
        </div>
      )
    } else {
      fantasyLeagueCards = (
        <div>
          {this.state.fantasyLeague.myFantasyLeagues.map(this.renderFantasyLeagueCard, this)}
        </div>
      );
    }
    return (
      <div className='rc-FantasyLeagues'>
        <SmallBanner
          title='My Fantasy Leagues'
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
          { fantasyLeagueCards }
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(FantasyLeagues)
