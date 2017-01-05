/**
 * @module components/lists/base/List
 */

/* Style Dependencies */
import './List.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import { AutoSizer, List as VirtualList } from 'react-virtualized';


export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  /**
   * See https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md for details
   */
  renderItem({key, index, style}) {
    return (
      <div
        key={key}
        style={style}
        >
        { this.props.items[index] }
      </div>
    );
  }

  renderHeader() {
    if(!this.props.title) {
      return;
    }

    return (
      <div className='header'>
        <div className='title'>{this.props.title}</div>
      </div>
    );
  }

  render() {
    let header = this.renderHeader();
    let that = this;

    return (
      <div className='rc-List'>
        {header}
        <div className='content'>
          <AutoSizer>
              {({ height, width }) => (
                <VirtualList
                  height={height}
                  rowCount={that.props.items.length}
                  rowHeight={58}
                  rowRenderer={that.renderItem}
                  overscanRowCount={50}
                  width={width}
                />
              )}
            </AutoSizer>
        </div>
      </div>
    );
  }
}

List.displayName = 'List';

const {any, array, bool, func, number, object, string} = React.PropTypes;

List.propTypes = {
  items: array.isRequired,
  title: string
};

List.defaultProps = {
  items: []
};
