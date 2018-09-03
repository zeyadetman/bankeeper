import React, {Component} from 'react';
import {default as currencies} from '../../currencies/index';
import {
    toPairs,
    map
} from 'ramda';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            currency: '',
            daylimit: 0,
            user: {
                name: 'Zeyad'
            }
        }
        this.handleDaylimitChange = this.handleDaylimitChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    }

    handleDaylimitChange(e) {
        this.setState({
            ...this.state,
            daylimit: e.target.value
        })
    }

    handleCurrencyChange(e) {
        this.setState({
            ...this.state,
            currency: e.target.value
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.token
                        ? (
                            <div>
                                <p>Hi {this.state.user.name}</p>
                            </div>
                        )
                        : (
                            <div>
                                <label>Set Your Goals</label>
                                <label>Set Your Day Limit</label>
                                <input type="number"
                                    onChange={this.handleDaylimitChange} />
                                <label>Set Your Currency</label>
                                <select onChange={this.handleCurrencyChange}>
                                    {
                                        map(
                                            e => (<option value={e[0]}>{e[1]}</option>),
                                            toPairs(currencies)
                                        )
                                    }
                                </select>

                                <p>Your Week limit is: <span> {Number(7 * this.state.daylimit)} </span>{this.state.currency}</p>
                                <p>Your Month limit is: <span> {Number(30 * this.state.daylimit)} </span>{this.state.currency}</p>
                                <p>Your Year limit is: <span> {Number(365 * this.state.daylimit)} </span>{this.state.currency}</p>
                                {console.log(currencies)}
                                <button onClick={this.handleSubmit}>Ok, Let's begin</button>
                            </div>
                        )
                }
            </div>
        )
    }
}
