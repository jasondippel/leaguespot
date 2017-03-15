/**
 * Component that displays team drafting options
 */

/* Style Dependencies */
import './Draft.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../../store';
import { Sanitize } from '../../../../utils/Sanitize';
import * as leagueInfo from '../../../../utils/ProLeagues';
import { fetchActiveFantasyLeague } from '../../../../actions/FantasyLeagueActions';
import FlatButton from '../../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../../leaguespot-components/components/buttons/RaisedButton';
import Section from '../../../../leaguespot-components/components/containers/Section';
import Tabs from '../../../../leaguespot-components/components/containers/Tabs';
import Popup from '../../../../leaguespot-components/components/popup/Popup';
import Toast from '../../../../leaguespot-components/components/toast/Toast';


class Draft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fantasyTeam: undefined,
      roster: {},
      maxRosterSize: props.maxRosterSize,
      leagues: props.leagues,
      sport: props.sport,
      activeLeague: props.leagues[0],
      players: [],
      loadingPlayers: false,
      toastOpen: false,
      toastMessage: '',
      toastType: 'DEFAULT',
      popupOpen: false,
      popupType: 'DEFAULT',
      popupTitle: '',
      popupMessage: '',
      popupButtons: []
    };

    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleOpenToast = this.handleOpenToast.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.showHelpPopup = this.showHelpPopup.bind(this);
  }

  handleOpenToast(type, message) {
    this.setState({
      toastOpen: true,
      toastType: type,
      toastMessage: message
    });
  }

  handleCloseToast() {
    this.setState({
      toastOpen: false
    });
  }

  handleOpenPopup(type, title, message, btns) {
    this.setState({
      popupOpen: true,
      popupType: type,
      popupTitle: title,
      popupMessage: message,
      popupButtons: btns
    });
  }

  handleClosePopup() {
    this.setState({
      popupOpen: false
    });
  }

  handleTabChange(activeTabValue) {
    this.setState({
      activeLeague: activeTabValue
    });
  }

  showHelpPopup() {
    let title = 'What You Need To Know';
    let type = 'DEFAULT';
    let buttons = [
      (
        <RaisedButton
          label='Close'
          type='primary'
          onClick={this.handleClosePopup} />
      )
    ];
    let content = (
      <div className='popupContent'>
        This is the help popup. I need to populate this with info once drafting process is created.
      </div>
    );

    this.handleOpenPopup(type, title, content, buttons);
  }

  renderTabs() {
    let tabs = [],
        i = 0;

    for(i=0; i < this.state.leagues.length; i++) {
      tabs[i] = {
        title: leagueInfo.getLeagueName(this.state.leagues[i]),
        value: this.state.leagues[i],
        content: 'TODO for leauge ' + this.state.leagues[i]
      }
    }

    return tabs;
  }

  renderMyRoster() {
    if (Object.keys(this.state.roster).length === 0) {
      return (
        <div className='emptyRoster'>
          Empty
        </div>
      );
    }

    return (
      <div>
        TODO: display selected roster
      </div>
    );
  }

  render() {
    let tabs = this.renderTabs();
    let myRosterList = this.renderMyRoster();

    return (
      <div className='rc-Draft'>

        <div className='content'>
          <Section
            showBackground={true}
            >
            <div>
              <div className='sectionHeader'>
                <div className='left'>
                  <div className='sectionTitle'>
                    {Sanitize(this.props.teamName)}
                  </div>
                  <div className='sectionSubTitle'>Draft</div>
                </div>

                <div className='right'>
                  <FlatButton
                    label='Help'
                    onClick={this.showHelpPopup} />
                  <FlatButton
                    label='Back to My Roster'
                    onClick={this.props.cancelDraftRoster} />
                </div>
              </div>
            </div>

            <div className='infoPanel'>
              <div className='left'></div>
              <div className='right'>
                <div className='pair'>
                  <span className='label'>Remaining Budget</span>
                  <span className='value'>${this.state.maxRosterSize * leagueInfo.getPlayerCostForSport(this.state.sport)}</span>
                </div>
                <div className='pair'>
                  <span className='label'>Avg Player Cost</span>
                  <span className='value'>$0</span>
                </div>
              </div>
            </div>

            <div className='column7' style={{padding: '1em'}}>
              <Tabs
                tabs={tabs}
                onChange={this.handleTabChange}
                colouredBackground={true}
                />
            </div>

            <div className='column5' style={{padding: '1em'}}>
              <Section
                title='My Roster'
                colouredHeader={true}
                colouredBackground={true}
                >
                {myRosterList}
              </Section>
            </div>

          </Section>
        </div>

        <Toast
          open={this.state.toastOpen}
          type={this.state.toastType}
          message={this.state.toastMessage}
          onClose={this.handleCloseToast}
          />

        <Popup
          open={this.state.popupOpen}
          type={this.state.popupType}
          title={this.state.popupTitle}
          message={this.state.popupMessage}
          onClose={this.handleClosePopup}
          buttons={this.state.popupButtons}
          />

      </div>
    );
  }
}

Draft.displayName = 'Draft';

const {any, array, bool, func, number, string} = React.PropTypes;

Draft.propTypes = {
  teamName: string,
  leagues: array,
  maxRosterSize: number,
  cancelDraftRoster: func,
  handleRosterSelectionChange: func,
  submitUpdatedRoster: func
};

Draft.defaultProps = {
  cancelDraftRoster: () => {},
  handleRosterSelectionChange: () => {},
  submitUpdatedRoster: () => {}
};

export default connect(
  (state) => ({})
)(Draft)
