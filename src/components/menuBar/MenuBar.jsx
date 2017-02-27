/**
 * MenuBar component. Renders a horizontal bar consisting of the items passed in.
 *
 */

/* Style Dependencies */
import './MenuBar.less';

/* Script Dependencies */
import React from 'react';


export default class MenuBar extends React.Component {
  constructor() {
    super();
  }

  renderMenuItem(item, key) {
    return(
      <div key={key}>
        {item}
      </div>
    );
  }

  render() {
    return (
      <div className='rc-MenuBar'>
        {this.props.items.map(this.renderMenuItem)}
      </div>
    );
  }
}
