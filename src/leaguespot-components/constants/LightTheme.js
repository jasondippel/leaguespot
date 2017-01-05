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
    primary1Color: '#49b64d',
    primary2Color: '#49b64d',
    primary3Color: grey600,
    accent1Color: grey200,
    accent2Color: grey400,
    accent3Color: '#999',
    textColor: '#0f0f0f',
    alternateTextColor: '#aaaaaa',
    canvasColor: fullWhite,
    borderColor: fade('#0f0f0f', 0.3),
    disabledColor: fade('#0f0f0f', 0.3),
    pickerHeaderColor: '#49b64d',
    clockCircleColor: fade('#0f0f0f', 0.12),
  },
};
