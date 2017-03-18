/**
 * Welcome/About standard page
 */

/* Style Dependencies */
import './Spinner.less';

/* Script Dependencies */
import React from 'react';


export default class Spinner extends React.Component {
  constructor() {
    super();
  }

  render() {
    let classList = 'rc-Spinner ' + this.props.size;

    return (
      <div className={classList}>
        <img className='bannerImage' src='src/img/spinner.gif' />
      </div>
    );
  }
}

Spinner.displayName = 'Spinner';

const {any, bool, func, number, string} = React.PropTypes;

Spinner.propTypes = {
  size: React.PropTypes.oneOf([
    'default',
    'small',
    'medium', // same as default
    'large'
  ])
};

Spinner.defaultProps = {
  size: 'default'
};
