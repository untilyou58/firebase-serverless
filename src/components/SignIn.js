import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
    <div className="form_login">
        <div className="form_login_span">
            <h1>Log In</h1>
            <SignInForm history={history} />
            <p><PasswordForgetLink /></p>
            <SignUpLink />
        </div>
    </div>

    const INITIAL_STATE = {
        email: '',
        password: '',
        error: null,
    };
    
    const byPropKey = (propertyName, value) => () => ({
        [propertyName]: value,
    });
    
    class SignInForm extends Component {
        constructor(props) {
            super(props);
    
            this.state = { ...INITIAL_STATE };
        }
    
        onSubmit = (event) => {
            const {
                email,
                password,
            } = this.state;
    
            const {
                history,
            } = this.props;
    
            auth.doSignInWithEmailAndPassword(email,password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error',error));
            })
    
            event.preventDefault();
        }
    
        render() {
            const {
                email,
                password,
                error,
            } = this.state;
    
            const isInvalid = 
                password === '' ||
                email === '';
    
            return (
                <div className="form_login_child">
                    <form onSubmit={this.onSubmit}>
                        <input 
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input 
                            value={password}
                            onChange={event => this.setState(byPropKey('password', event.target.value))}
                            type="password"
                            placeholder="Password"
                            autoComplete="true"
                        />
                        <button disabled={isInvalid} type="submit">
                            Sign In
                        </button>
        
                        {error && <p>{error.message}</p>}
                    </form>
                </div>
            );
        }
    }
    
    
    export default withRouter(SignInPage);
    
    export {
        SignInForm,
    };