/**
 * This is the footer that gets displayed on every page as part of Layout.
 *
 * TODO: add CSS to force Footer to bottom of page (not sticky! just page bottom)
 */

import React from "react";


export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div class="row">
          <p>Copyright &copy; leaguespot.com</p>
        </div>
      </footer>
    );
  }
}
