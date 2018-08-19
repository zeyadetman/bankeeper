import React, {Component} from 'react';
import './default.css';
import Login from '../Login/Login';

export default class Default extends Component {
    render() {
        return (
            <div className="default">
                <Login />
            </div>
        )
    }
}
