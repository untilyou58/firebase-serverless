import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = ({ authUser }) =>
    <div className="form_login">
        <h2>Account: {authUser.email}</h2>
        <div className="form_change_master">
            <div className="form_change">
                <div className="form_login_span">
                        <PasswordChangeForm />
                </div>
                <div className="form_change"></div>
            </div>
            <div className="form_change">
                <div className="form_login_span">
                    <PasswordForgetForm />
                </div>
                <div className="form_change"></div>
            </div>
        </div>
    </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);