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
import LightTheme from '../../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e) {
    this.props.onSelect();
    e.stopPropagation();
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
        buttonsRight,
        classList = this.props.itemClass;

    if (this.props.mediaLeft) {
      mediaLeft = this.renderMediaLeft();
    }
    if (this.props.buttonsRight) {
      buttonsRight = this.renderButtonsRight();
    }
    if (this.props.selectable) {
      classList += ' selectable';
    }
    if (this.props.active) {
      classList += ' active';
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className={'rc-ListItem ' + classList} onClick={this.handleItemClick}>
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
