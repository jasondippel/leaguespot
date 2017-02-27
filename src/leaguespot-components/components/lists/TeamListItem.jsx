/**
 * @module components/lists/base/ListItem
 */

 /* Style Dependencies */
import './TeamListItem.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import Avatar from 'material-ui/Avatar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import ListItem from './base/ListItem';

/* Material UI Theme */
import customTheme from '../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class TeamListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTeamTitle() {
    let title = (
      <span className='teamName'>{this.props.teamName}</span>
    );

    if (this.props.fleagueName) {
      title = (
        <span>
          <span className='teamName'>{this.props.teamName}</span>
          <span className='fleagueName'>{this.props.fleagueName}</span>
        </span>
      );
    }

    return title;
  }

  renderTeamStats() {
    if(!this.props.teamStats) {
      return;
    }

    let stats = [];
    _.each(this.props.teamStats, (stat, key) => {
      stats.push((
        <div className='stat' key={key}>
            <span className='value'>{stat.value}</span>
            <span className='fieldName'>{stat.fieldName}</span>
        </div>
      ));
    });

    return (
      <div>
        {stats}
      </div>
    );
  }

  renderButtons() {
    let buttons = [];

    // ensure each button has a key value assigned for React rendering
    _.each(this.props.buttons, (button, key) => {
        buttons.push((
          <span key={key}>
            {button}
          </span>
        ));
    });

    return (
      <div>
        {buttons}
      </div>
    );
  }

  render() {
    let teamTitle = this.renderTeamTitle(),
        teamInfo = this.renderTeamStats(),
        buttons = this.renderButtons();

    return (
      <ListItem
        itemClass='rc-TeamListItem'
        mainText={teamTitle}
        secondaryText={teamInfo}
        buttonsRight={buttons}
        />
    );
  }
}

TeamListItem.displayName = 'TeamListItem';

const {any, array, bool, func, number, object, string} = React.PropTypes;

TeamListItem.propTypes = {
  teamName: string.isRequired,
  fleagueName: string,
  teamStats: array,
  buttons: array
};

TeamListItem.defaultProps = {
};
