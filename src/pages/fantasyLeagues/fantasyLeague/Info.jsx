/**
 * Info for a given fantasy league
 */

/* Style Dependencies */
import './Info.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import { Sanitize } from '../../../utils/Sanitize';
import * as leagueInfo from '../../../utils/ProLeagues';
import { fetchActiveFantasyLeague } from '../../../actions/FantasyLeagueActions';
import FlatButton from '../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../leaguespot-components/components/buttons/RaisedButton';
import Section from '../../../leaguespot-components/components/containers/Section';


class Info extends React.Component {
  constructor() {
    super();

    this.state = {
      fantasyLeague: null
    }

    store.subscribe(() => {
      this.setState({
        fantasyLeague: store.getState().fantasyLeague.activeFantasyLeague,
        user: store.getState().user.user
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

  handleDeleteLeague() {

  }

  handleLeaveLeague() {

  }

  renderDeleteButton() {
    let component = '';

    if (this.state.fantasyLeague && this.state.fantasyLeague.fleague_creator === this.state.user.id) {
      component = (
        <div className='column12' style={{marginTop: '1em'}}>
          <RaisedButton
            label='Delete League'
            type='warning'
            noPadding={true}
            />
        </div>
      );
    } else {
      component = (
        <div className='column12' style={{marginTop: '1em'}}>
          <RaisedButton
            label='Leave League'
            type='warning'
            noPadding={true}
            />
        </div>
      );
    }

    return component;
  }

  render() {
    if (!this.state.fantasyLeague || this.state.fantasyLeague.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    let button = this.renderDeleteButton();
    let leagueList = '';
    this.state.fantasyLeague.pro_leagues.map((league, index) => {
      let leagueName = leagueInfo.getLeagueName(league);
      if (index === 0) {
        leagueList += leagueName;
      } else {
        leagueList += ', ' + leagueName;
      }
    });
    let hometown = this.state.fantasyLeague.hometown ? this.state.fantasyLeague.hometown : 'n/a';
    let socialRules = this.state.fantasyLeague.social_rules ? this.state.fantasyLeague.social_rules : 'n/a';

    return (
      <div className='rc-Info'>

        <div className='content'>
          <Section>
            <Section
              title='General Info'
              width={4}
              >
              <div className='column12'>
                <div className='labelTitle'>League Name</div>
                <div className='labelValue'>{Sanitize(this.state.fantasyLeague.fleague_name)}</div>
              </div>
              <div className='column12'>
                <div className='labelTitle'>Sport</div>
                <div className='labelValue'>{Sanitize(this.state.fantasyLeague.sport)}</div>
              </div>
              <div className='column12'>
                <div className='labelTitle'>Leagues</div>
                <div className='labelValue multiline'>{Sanitize(leagueList)}</div>
              </div>
              <div className='column12'>
                <div className='labelTitle'>Players</div>
                <div className='labelValue'>{Object.keys(this.state.fantasyLeague.users).length + Object.keys(this.state.fantasyLeague.invited_users).length}</div>
              </div>
              {button}
            </Section>


            <Section className='section'
              title='Rules'
              width={8}
              >
              <div className='column12'>
                <div className='labelTitle'>Hometown</div>
                <div className='labelValue'>{Sanitize(hometown)}</div>
              </div>
              <div className='column12'>
                <div className='labelTitle'>Max Roster Size</div>
                <div className='labelValue'>TODO</div>
              </div>
              <div className='column12'>
                <div className='labelTitle'>Active Roster Size</div>
                <div className='labelValue'>{leagueInfo.getActiveRosterSize(this.state.fantasyLeague.sport)}</div>
              </div>
              <div className='column12'>
                <div className='labelTitle full'>Social Rules</div>
                <div className='labelValue full multiline'>{Sanitize(socialRules)}</div>
              </div>
            </Section>
          </Section>

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Info)
