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
import colors from './colours';

export default {
  spacing: spacing,
  fontFamily: 'Lato, sans-serif',
  palette: {
    primary1Color: colors.leaguespotGreenPrimary,
    primary2Color: colors.leaguespotGreenPrimary,
    primary3Color: grey600,
    accent1Color: grey200,
    accent2Color: grey400,
    accent3Color: colors.lightTextSecondary,
    textColor: colors.darkTextPrimary,
    alternateTextColor: colors.lightTextPrimary,
    canvasColor: colors.lightBackgroundContainer,
    borderColor: fade('#0f0f0f', 0.3),
    disabledColor: fade('#0f0f0f', 0.3),
    pickerHeaderColor: colors.leaguespotGreenPrimary,
    clockCircleColor: fade('#0f0f0f', 0.12),
  },
};
