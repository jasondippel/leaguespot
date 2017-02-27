/**
 * @module components/inputs/geoInput/GeoInput
 */

/* Style Dependencies */
import './GeoInput.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import Geosuggest from './react-geosuggest/Geosuggest';

/* Material UI Theme */
import LightTheme from '../../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class GeoInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className='rc-GeoInput'>
          <Geosuggest {... this.props}
            types={['(cities)']}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

GeoInput.displayName = 'GeoInput';

const {any, bool, func, number, string} = React.PropTypes;

GeoInput.propTypes = {
  floatingLabelText: string,
  hintText: string,
  onChange: func,
  onKeyDown: func,
  onSuggestSelect: func
};

GeoInput.defaultProps = {
  onChange: () => {},
  onKeyDown: () => {},
  onSuggestSelect: () => {}
};
