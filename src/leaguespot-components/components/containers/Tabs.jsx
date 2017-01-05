/**
 * @module components/containers/Section
 */

/* Style Dependencies */
import './Tabs.less';

/* Script Dependencies */
import React from 'react';
import {Tabs as MuiTabs, Tab} from 'material-ui/Tabs';

/* Material UI Theme */
import customTheme from '../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTabs() {
    let tabTitleStyle = {
      fontSize: '1.5em',
      fontWeight: '300',
      boxSizing: 'border-box',
      textTransform: 'none'
    };

    let tabs = this.props.tabs.map(function(tabObj, key) {
      return (
        <Tab label={tabObj.title} key={key} className="tab" style={tabTitleStyle}>
          <div className='content'>{tabObj.content}</div>
        </Tab>
      );
    });

    return tabs;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className='rc-Tabs'>
          <MuiTabs
            tabItemContainerStyle={{'borderTopLeftRadius': '2px', 'borderTopRightRadius': '2px'}}
            >
            {this.renderTabs()}
          </MuiTabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

Tabs.displayName = 'Tabs';

const {array} = React.PropTypes;

Tabs.propTypes = {
  tabs: array
};

Tabs.defaultProps = {
  tabs: [] // list of objects with 'title' and 'content' keys used to populate tabs
};
