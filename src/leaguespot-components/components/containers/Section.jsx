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
    let classNames = '';

    if (this.props.showBackground) {
      classNames += ' backgroundColor';
    }
    if (this.props.noPadding) {
      classNames += ' noPadding';
    }

    return 'columnSpacing column' + this.props.width + classNames;
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
    let contentClassList = 'content';

    if (this.props.showBackground) {
      contentClassList += ' colouredBackground';
    }
    if (this.props.padContent) {
      contentClassList += ' padContent';
    }

    return (
      <div className={'rc-Section ' + classList}>
        <div className='padding'>
          {titleContainer}
          <div className={contentClassList} >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Section.displayName = 'Section';

const {bool, string} = React.PropTypes;

Section.propTypes = {
  showBackground: bool,
  padContent: bool,
  noPadding: bool,
  colouredHeader: bool,
  title: string,
  subTitle: string,
  width: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
};

Section.defaultProps = {
  showbackground: false,
  padContent: false,
  noPadding: false,
  colouredHeader: false,
  title: undefined,
  subTitle: undefined,
  width: 12
};
