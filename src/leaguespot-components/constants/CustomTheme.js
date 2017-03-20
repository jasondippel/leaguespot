/*
 * Custom Colors for MaterialUI
 * - for more colour options, see colours.less
 */

import {
  grey50, grey200, grey400, grey600,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Lato, sans-serif',
  palette: {
    primary1Color: '#329939',
    primary2Color: '#2C7730',
    primary3Color: grey600,
    accent1Color: grey200,
    accent2Color: grey400,
    accent3Color: '#aaa',
    textColor: fullWhite,
    alternateTextColor: '#ffffff',
    canvasColor: '#222326',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: '#329939',
    clockCircleColor: fade(fullWhite, 0.12),
  },
};
