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
    let position = this.props.position ? this.props.position : '';
    let points = this.props.points ? this.props.points : '';

    let title = (
      <div className='teamListTitle'>
        <div className='left'>
          <div className='teamName'>{this.props.teamName}</div>
          <div className='position'>{position}</div>
        </div>

        <div className='right'>
          <div className='ptsLabel'>PTS</div>
          <div className='ptsValue'>{points}</div>
        </div>
      </div>
    );

    return title;
  }

  render() {
    let teamTitle = this.renderTeamTitle();

    return (
      <ListItem
        itemClass='rc-TeamListItem'
        mainText={teamTitle}
        />
    );
  }
}

TeamListItem.displayName = 'TeamListItem';

const {any, array, bool, func, number, object, string} = React.PropTypes;

TeamListItem.propTypes = {
  teamName: string.isRequired,
  position: string,
  points: number
};

TeamListItem.defaultProps = {
};
