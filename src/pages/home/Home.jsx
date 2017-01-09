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
import store from '../store';

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
            <div>Fantasy Sports for Real Social Change</div>

          {
            this.state.loggedIn ? (
              <div className='_dashboardBtn'>
                <Link to='/dashboard'>
                  <RaisedButton
                    label='My Dashboard'
                    shaddow={true} />
                </Link>
              </div>
            ): ''
          }

          </div>
        </div>

        <div className='infoBanner'>
          We provide users with the power to setup a fantasy league that focuses on the sport. Users can create fantasy leagues containing multiple professional leagues from the same sport. This will both enrich the users experience while bringing attention to smaller sports leagues.
        </div>

        <div className='content'>
          Add content here...
        </div>

      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Home)
