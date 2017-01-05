/**
 * @module components/buttons/RaisedButton
 */

/* Style Dependencies */
import './RaisedButton.less';

/* Script Dependencies */
import React from 'react';


export default class RaisedButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className='rc-RaisedButton'>
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

RaisedButton.displayName = 'RaisedButton';

const {any, bool, func, number, string} = React.PropTypes;

RaisedButton.propTypes = {
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

RaisedButton.defaultProps = {
  type: 'default',
  onClick: () => {}
};
