/**
 * Ghost page to handle user sign out. Redirects to home page
 */

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';


export default class SignOut extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
  }

  handleSignOut() {
    // TODO: actually handle sign out
    this.context.router.push('/');
  }

  render() {
    this.handleSignOut();

    // This should never actually be shown
    return (
      <div className='rc-SignOut' style={{textAlign: 'center', paddingTop: '25vh'}}>
        Signing out...
      </div>
    );
  }
}
