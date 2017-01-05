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
    let style = {};
    if (this.props.shaddow) {
      style = {
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.35)'
      };
    }

    return (
      <div className='rc-RaisedButton'>
        <button
          className={this.props.type}
          onClick={this.handleOnClick}
          disabled={this.props.type === 'disabled' ? true : false}
          style={style}
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
  shaddow: bool,
  type: React.PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'warning',
    'disabled'
  ])
};

RaisedButton.defaultProps = {
  shaddow: false,
  type: 'default',
  onClick: () => {}
};
