/**
 * Welcome/About standard page
 */

/* Style Dependencies */
import './SmallBanner.less';

/* Script Dependencies */
import React from 'react';

export default class SmallBanner extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="rc-SmallBanner">
        <div className="title">
          {this.props.title}
        </div>
      </div>
    );
  }
}

SmallBanner.displayName = 'SmallBanner';

const {any, bool, func, number, string} = React.PropTypes;

SmallBanner.propTypes = {
  title: string,
  backgroundImage: string
};

SmallBanner.defaultProps = {
};
