import React from 'react'; // eslint-disable-line no-unused-vars
import shallowCompare from 'react/lib/shallowCompare';
import classnames from 'classnames';
import TextField from 'material-ui/TextField';

import filterInputAttributes from './filter-input-attributes';

/* Material UI Theme */
import LightTheme from '../../../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class Input extends React.Component {
  /**
   * Whether or not the component should update
   * @param {Object} nextProps The new properties
   * @param {Object} nextState The new state
   * @return {Boolean} Update or not?
   */
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /**
   * When the input got changed
   * @param {Event} e the event
   * @param {String} newValue the new value
   */
  onChange = (e, newValue) => {
    this.props.onChange(newValue);
  }

  /**
   * When the input got focused
   */
  onFocus = () => {
    this.props.onFocus();
  }

  /**
   * When the input loses focus
   */
  onBlur = () => {
    this.props.onBlur();
  }

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
  onKeyPress = event => {
    this.props.onKeyPress(event);
  }

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keydown event
   */
  onInputKeyDown = event => { // eslint-disable-line complexity
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        this.props.onNext();
        break;
      case 38: // UP
        event.preventDefault();
        this.props.onPrev();
        break;
      case 13: // ENTER
        if (this.props.ignoreEnter) {
          event.preventDefault();
        }

        this.props.onSelect();
        break;
      case 9: // TAB
        if (!this.props.ignoreTab) {
          this.props.onSelect();
        }
        break;
      case 27: // ESC
        this.props.onEscape();
        break;
      /* istanbul ignore next */
      default:
        break;
    }
  }

  /**
   * Focus the input
   */
  focus() {
    this.refs.input.focus();
  }

  /**
   * Blur the input
   */
  blur() {
    this.refs.input.blur();
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const attributes = filterInputAttributes(this.props),
      classes = classnames(
        'geosuggest__input',
        this.props.className
      );

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <TextField
          className={classes}
          ref='input'
          type='text'
          autoComplete='off'
          {...attributes}
          value={this.props.value}
          style={this.props.style}
          onKeyDown={this.onInputKeyDown}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          id='geoSuggest'
          floatingLabelFixed={this.props.floatingLabelFixed}
          floatingLabelText={this.props.floatingLabelText}
          fullWidth={this.props.fullWidth}
          />
      </MuiThemeProvider>
      );
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
  className: '',
  value: '',
  ignoreTab: false,
  onKeyDown: () => {},
  onKeyPress: () => {}
};

export default Input;
