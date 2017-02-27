/**
 * @module components/chips/Chip
 */

/* Style Dependencies */
import './Chip.less';

/* Script Dependencies */
import React from 'react';
import MuiChip from 'material-ui/Chip';

/* Material UI Theme */
import customTheme from '../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



export default class Chip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let labelStyle = {
      fontWeight: 300
    };

    return (
      <div className='rc-Chip'>
        <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
          <MuiChip
            key={this.props.chipKey}
            onRequestDelete={this.props.onRequestDelete}
            labelStyle={labelStyle}
            >
            {this.props.children}
          </MuiChip>
        </MuiThemeProvider>
      </div>
    );
  }
}

Chip.displayName = 'Chip';

const {any, bool, func, number, string} = React.PropTypes;

Chip.propTypes = {
  chipKey: any,
  onRequestDelete: func
};

Chip.defaultProps = {
  onRequestDelete: () => {}
};
