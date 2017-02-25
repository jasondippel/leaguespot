/**
 * Strips out any html that may be injected by user.
 */
import $ from 'jquery';

export function Sanitize (input) {
   return $( $.parseHTML(input) ).text();
}
