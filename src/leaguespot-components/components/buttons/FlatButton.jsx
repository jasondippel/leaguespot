/**
 * @module components/buttons/RaisedButton
 */

/* Style Dependencies */
import './FlatButton.less';

/* Script Dependencies */
import React from 'react';


export default class FlatButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className='rc-FlatButton'>
        <button
          className={this.props.type}
          onClick={this.handleOnClick}
          disabled={this.props.type === 'disabled' ? true : false}
          >
          {this.props.label}
        </button>
      </div>
    );
  }
}

FlatButton.displayName = 'FlatButton';

const {any, bool, func, number, string} = React.PropTypes;

FlatButton.propTypes = {
  disabled: bool,
  label: string,
  onClick: func,
  type: React.PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'warning',
    'disabled'
  ])
};

FlatButton.defaultProps = {
  type: 'default',
  onClick: () => {}
};
