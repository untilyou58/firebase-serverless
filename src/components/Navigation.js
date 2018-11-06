import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
  <div>
        { authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
  </div>

const NavigationAuth = () =>
    <div className="navigation">
        <div className="navigation-child"><Link to={routes.HOME}>Home</Link></div>
        <div className="li-child">
            <span>
                <div className="sign_in"><Link to={routes.LANDING}>Landing</Link></div>
            </span>
        </div>
        <div className="li-child">
            <span>
                <div className="sign_in"><Link to={routes.ACCOUNT}>Account</Link></div>
            </span>
        </div>
        <div className="li-child">
            <span>
                <div className="sign_out"><SignOutButton /></div>
            </span>
        </div>
    </div>

const NavigationNonAuth = () =>
  <div className="navigation">
    <div className="navigation-child">
        <div><Link to={routes.LANDING}>Home</Link></div>
    </div>
    <div className="li-child">
        <span>
            <div className="sign_in">
                <Link to={routes.SIGN_IN}>Sign In</Link>
            </div>
        </span>
    </div>
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);