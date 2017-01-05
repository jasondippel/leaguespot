/**
 * @module components/inputs/selectors/Option
 */

/* Style Dependencies */
// import './Option.less';

/* Script Dependencies */
import React from 'react';
import MuiMenuItem from 'material-ui/MenuItem';


export default class Option extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      primaryText: props.primaryText
    }
  }

  render() {
    return (
      <MuiMenuItem {...this.props} />
    );
  }
}

Option.displayName = 'Option';

const {any, bool, func, number, string} = React.PropTypes;

Option.propTypes = {
  value: any.isRequired,
  primaryText: string.isRequired
};

Option.defaultProps = {
};
