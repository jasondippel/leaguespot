/**
 * @module components/lists/base/List
 */

/* Style Dependencies */
import './List.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import { AutoSizer, List as WrappedList } from 'react-virtualized';

class VirtualList extends React.Component {
  componentDidUpdate(prevProps) {
    console.log('jason tset23');
    if (this.list && prevProps.renderData !== this.props.renderData) this.list.forceUpdateGrid()
  }

  render() {
    const {rowRenderer, renderData, ...props} = this.props
    return (
      <WrappedList
        {...props}
        ref={c => this.list = c}
        rowRenderer={props => rowRenderer({...props, ...renderData})}
      />
    )
  }
}

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    let test1 = this.list;
    let test2 = this.List;
    let test3 = this.VirtualList;
    console.log('jason test');
    if (this.list && prevProps.items !== this.props.items) {
      this.list.forceUpdateGrid();
    }
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
                  rowHeight={56}
                  rowRenderer={that.renderItem}
                  overscanRowCount={20}
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
