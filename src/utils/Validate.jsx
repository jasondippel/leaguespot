/**
 * This file provides basic javascript functions for retrieving data stored
 * in localStorage. Used primarily for user sessions.
 */

import _ from 'underscore';

export function validateEmail(email) {
    var atpos = email.indexOf('@');
    var dotpos = email.lastIndexOf('.');
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      return false;
    } else {
      return true;
    }
  }
