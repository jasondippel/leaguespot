/**
 * 404 Error page
 */

/* Style Dependencies */
import './ErrorPage.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';

export default class ErrorPage404 extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-ErrorPage'>
        <div className='title'>
          404
        </div>

        <div className='subTitle'>
          Page Not Found
        </div>

        <div className='content'>
          The page you're looking for either doesn't exist or we made an error. <br/>
          Go back to the <Link to='/'>home</Link> page.
        </div>
      </div>
    );
  }
}
