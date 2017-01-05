/**
 * @module components/lists/base/ListItem
 */

/* Style Dependencies */
import './ListItem.less';

/* Script Dependencies */
import React from 'react';
import FlatButton from '../../buttons/FlatButton';
import RaisedButton from '../../buttons/RaisedButton';

/* Material UI Theme */
import customTheme from '../../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMediaLeft() {
    return (
      <div className='mediaLeft'>
        {this.props.mediaLeft}
      </div>
    );
  }

  renderBody() {
    let style = { verticalAlign: 'middle', lineHeight: '35px' };

    if (this.props.mediaLeft) {
      style['lineHeight'] = '1.5em';
    }
    if (this.props.secondaryText) {
      style = { verticalAlign: 'top' };
    }
    return (
      <div className='body' style={style} >
        <div className='main'>{this.props.mainText}</div>
        <div className='secondary'>{this.props.secondaryText}</div>
      </div>
    )
  }

  renderButtonsRight() {
    return (
      <div className='buttons'>
        {this.props.buttonsRight}
      </div>
    )
  }

  render() {
    let mediaLeft,
        body = this.renderBody(),
        buttonsRight;

    if (this.props.mediaLeft) {
      mediaLeft = this.renderMediaLeft();
    }
    if (this.props.buttonsRight) {
      buttonsRight = this.renderButtonsRight();
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className={'rc-ListItem ' + this.props.itemClass}>
          {mediaLeft}
          {body}
          {buttonsRight}
        </div>
      </MuiThemeProvider>
    );
  }
}

ListItem.displayName = 'ListItem';

const {any, bool, func, number, object, string} = React.PropTypes;

ListItem.propTypes = {
  mainText: React.PropTypes.oneOfType([
    string,
    object]).isRequired,
  secondaryText: React.PropTypes.oneOfType([
    string,
    object]),
  mediaLeft: object,
  buttonsRight: object,
  itemClass: string
};

ListItem.defaultProps = {
};
