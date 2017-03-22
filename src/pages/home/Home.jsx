/**
 * Welcome/About standard page
 */

/* Style Dependencies */
import './Home.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import { connect } from 'react-redux';
import store from '../Store';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    };

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched), we will update local component state and force component to rerender with new data.
      this.setState({
        loggedIn: store.getState().user.loggedIn
      });
    });
  }

  componentWillMount() {
    // Get current state from store. Initial render does not have this info yet.
    // Any changes to this information while this component is rendered will be
    // caught by subscription to store above and update this component's state.
    this.setState({
      loggedIn: store.getState().user.loggedIn
    });
  }

  render() {
    return (
      <div className='rc-Home'>

        <div className='banner'>
          <div className='title'>
            LeagueSpot
          </div>
          <div className='subText'>
            <div>Why choose one when you can have them all?</div>

          {
            this.state.loggedIn ? (
              <div className='_dashboardBtn'>
                <Link to='/fantasy-leagues'>
                  <RaisedButton
                    label='My Fantasy Leagues'
                    type='primary'
                    shaddow={true} />
                </Link>
              </div>
            ): ''
          }

          </div>
        </div>

        <div className='infoBanner'>
          Why restrict people to choosing just one league? We believe that great things come when you open up the door to new possibilities, so we're letting you choose what leagues to include in your fantasy pool. No longer are you limited to just one. It's time to challenge you're abilities and expand you're comfort zone to new sports leagues.
        </div>

        <div className='content'>
          <div>
            <div className='leagueBanner'>
              <img className='leagueLogo' src='src/img/leagues/hockey/nhl.png' />
              <img className='leagueLogo' src='src/img/leagues/hockey/cwhl.png' />
              <img className='leagueLogo' src='src/img/leagues/hockey/ohl.png' />
              <img className='leagueLogo' src='src/img/leagues/hockey/whl.png' />
              <img className='leagueLogo' src='src/img/leagues/hockey/qmjhl.png' />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Home)
