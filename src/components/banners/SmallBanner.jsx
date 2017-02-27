/**
 * Welcome/About standard page
 */

/* Style Dependencies */
import './SmallBanner.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import { Sanitize } from '../../utils/Sanitize';

export default class SmallBanner extends React.Component {
  constructor() {
    super();
  }

  renderButton() {
    if (!this.props.showButton) {
      return;
    }

    return (
      <div className='buttons'>
        { this.props.button }
      </div>
    )
  }

  render() {
    let button = this.renderButton();

    return (
      <div className='rc-SmallBanner'>
        <div className='title'>
          {Sanitize(this.props.title)}
          <span className='subTitle'>{Sanitize(this.props.subTitle)}</span>
        </div>

        { button }
      </div>
    );
  }
}

SmallBanner.displayName = 'SmallBanner';

const {any, bool, func, number, string} = React.PropTypes;

SmallBanner.propTypes = {
  title: string,
  backgroundImage: string,
  showButton: bool,
};

SmallBanner.defaultProps = {
  showButton: false
};
