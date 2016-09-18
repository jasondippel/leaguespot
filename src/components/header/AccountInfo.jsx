import React from 'react';
import { Link } from 'react-router';
// import UserStore from '../../stores/UserStore';
// import APIRequest from '../../scripts/APIRequest';
import * as auth from '../../utils/PersistentUser';

export default class HeaderMenu extends React.Component {
  constructor() {
    super();

    this.setUserFirstName = this.setUserFirstName.bind(this);
    this.logout = this.logout.bind(this);

    this.renderButtonGroup = this.renderButtonGroup.bind(this);

    // this.state = {
    //   userFirstName: UserStore.getFirstName()
    // }
  }

  // componentWillMount() {
  //   UserStore.on('change', this.setUserFirstName.bind(this));
  // }
  //
  // componentWillUnmount() {
  //   UserStore.removeListener('change', this.setUserFirstName.bind(this));
  // }

  setUserFirstName() {
    // this.setState({
    //   userFirstName: UserStore.getFirstName()
    // });
  }

  logout() {
    // let that = this; TODO: change 'that' to 'self'

    // APIRequest.post({
    //   api: 'LeagueSpot',
    //   apiExt: '/logout',
    //   data: null
    // }).then((resp) => {
    //   if(resp.success) {
    //     that.props.logout();
    //   }
    //   else {
    //     alert('Failed to loggout: ' + resp.responseText);
    //   }
    // }).catch((error) => {
    //   console.log('Error making request: ', error);
    // });
  }

  renderButtonGroup() {
    if (auth.loggedIn()) {
      return (
        <span>
          <label>{this.state.userFirstName}</label>
          <button className='btn whiteOutlineBtn' onClick={this.logout}>Logout</button>
        </span>
      );
    }
    else {
      return (
        <span>
          <Link to='/register'><button className='btn whiteOutlineBtn'>Register</button></Link>
          <Link to='/login'><button className='btn whiteOutlineBtn'>Sign In</button></Link>
        </span>
      );
    }
  }

  render() {
    return (
      <div className='accountInfo'>
        {this.renderButtonGroup()}
      </div>
    );
  }
}
