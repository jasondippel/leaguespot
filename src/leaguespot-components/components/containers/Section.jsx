/**
 * @module components/containers/Section
 */

/* Style Dependencies */
import './Section.less';
import '../../constants/spacing.less';

/* Script Dependencies */
import React from 'react';


export default class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  determineClasses() {
    return 'columnSpacing column' + this.props.width;
  }

  renderTitle() {
    let component = '';
    if (this.props.title) {
      component = (
        <div className={this.props.colouredHeader ? 'title coloured' : 'title'}>
          <span className='text'>{this.props.title}</span> <span className='subTitle'>{this.props.subTitle}</span>
        </div>
      );
    }
    return component;
  }

  render() {
    let classList = this.determineClasses();
    let titleContainer = this.renderTitle();

    return (
      <div className={'rc-Section ' + classList}>
        {titleContainer}
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Section.displayName = 'Section';

const {bool, string} = React.PropTypes;

Section.propTypes = {
  colouredHeader: bool,
  title: string,
  subTitle: string,
  width: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
};

Section.defaultProps = {
  colouredHeader: false,
  title: undefined,
  subTitle: undefined,
  width: 12
};
