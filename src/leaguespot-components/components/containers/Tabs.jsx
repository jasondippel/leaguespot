/**
 * @module components/containers/Section
 */

/* Style Dependencies */
import './Tabs.less';
import colours from '../../constants/colours';

/* Script Dependencies */
import React from 'react';
import {Tabs as MuiTabs, Tab} from 'material-ui/Tabs';

/* Material UI Theme */
import LightTheme from '../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0
    }

    this.handleActiveTabChange = this.handleActiveTabChange.bind(this);
  }

  handleActiveTabChange(tab, temp) {
    this.setState({
      activeTabIndex: tab.props.index
    });
  }

  renderTabs() {
    let tabTitleStyle = {
      fontSize: '1.5em',
      fontWeight: '300',
      boxSizing: 'border-box',
      textTransform: 'none',
      color: colours.lightTextPrimary
    };

    let that = this;
    let tabs = this.props.tabs.map(function(tabObj, key) {
      let title = tabObj.title;
      if (key === that.state.activeTabIndex) {
        title = (
          <span style={{fontWeight: 400}}>{title}</span>
        );
      }
      return (
        <Tab
          label={title}
          key={key}
          value={tabObj.value}
          className='tab'
          style={tabTitleStyle}
          onActive={that.handleActiveTabChange}
          >
          <div className={that.props.colouredBackground ? 'content colouredBackground' : 'content'}>{tabObj.content}</div>
        </Tab>
      );
    });

    return tabs;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className='rc-Tabs'>
          <MuiTabs
            tabItemContainerStyle={{
              borderTopLeftRadius: '2px',
              borderTopRightRadius: '2px'
            }}
            inkBarStyle={{
              background: colours.darkTextPrimary
            }}
            onChange={this.props.onChange}
            >
            {this.renderTabs()}
          </MuiTabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

Tabs.displayName = 'Tabs';

const {array, func} = React.PropTypes;

Tabs.propTypes = {
  tabs: array,
  onChange: func
};

Tabs.defaultProps = {
  tabs: [], // list of objects with 'title' and 'content' keys used to populate tabs
  onChange: () => {}
};
