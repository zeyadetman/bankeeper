import React, {Component} from 'react';
import './login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div className="login-panel">
                <div className="login-panel__welcome">
                    <img src="https://github.com/zeyadetman/Bankeeper/blob/master/logo.png?raw=true" alt="logo" />
                </div>
                <div className="login-panel__inputs">
                    <input type="email" name="email" placeholder="ex. zeyad@bankeeper.com" />
                    <input type="password" name="password" />
                    <button>Sign in</button>
                </div>

                <a href="" className="login-panel__forgot-password">Forgot your password?</a>
                <a href="" className="login-panel__create-account">Create Account</a>
            </div>
        )
    }
}
