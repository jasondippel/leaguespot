/**
 * Ghost page to handle user sign out. Redirects to home page
 */

/* Script Dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../../actions/UserActions';


class SignOut extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
  }

  componentWillMount() {
    this.handleSignOut();
  }

  handleSignOut() {
    this.props.dispatch(removeUser());
    this.context.router.push('/');
  }

  render() {
    // This should never actually be shown
    return (
      <div className='rc-SignOut' style={{textAlign: 'center', paddingTop: '25vh'}}>
        Signing out...
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(SignOut)
