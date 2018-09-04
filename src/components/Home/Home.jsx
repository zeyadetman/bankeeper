import React, {Component} from 'react';
import { Route, Link } from "react-router-dom"
import {default as currencies} from '../../currencies/index';
import Day from './../Day/Day';

import {
    toPairs,
    map,
    split,
    replace
} from 'ramda';
import {
    Dropdown,
    Input,
    Label,
    Form,
    TextArea,
    Button
} from 'semantic-ui-react';
import './home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            currency: 'EGP',
            daylimit: 0,
            user: {
                name: 'Zeyad'
            },
            goals: []
        }
        this.handleDaylimitChange = this.handleDaylimitChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleGoalsChange = this.handleGoalsChange.bind(this);
    }

    handleDaylimitChange(e) {
        this.setState({
            ...this.state,
            daylimit: e.target.value
        })
    }

    handleCurrencyChange(e, {name, value}) {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleGoalsChange(e) {
        const goals = map(item => replace(/^\s+|\s+$/g, '', item), split(',', e.target.value));
        this.setState({goals});
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div className="home">
                        {
                            this.state.token
                                ? (
                                    <div>
                                        <p>Hi {this.state.user.name}</p>
                                    </div>
                                )
                                : (
                                    <div>

                                        <Form className="home__goals">
                                            <TextArea rows={6}
                                                placeholder="Set your goals! Comma seperated&#10;e.g. buy a car, buy a new house"
                                                onChange={this.handleGoalsChange} />
                                        </Form>

                                        <Dropdown placeholder='Select Currency'
                                            fluid
                                            search
                                            selection
                                            name='currency'
                                            className="home__currency"
                                            value={this.state.currency}
                                            onChange={this.handleCurrencyChange}
                                            options={
                                                map(ob => {
                                                    return {'key': ob[0], 'value': ob[0], 'text': ob[1]}
                                                },
                                                    toPairs(currencies))
                                            }
                                        />

                                        <Input labelPosition='right'
                                            onChange={this.handleDaylimitChange}
                                            type='number'
                                            className="home__amount-limit"
                                            placeholder='Day Limit'>
                                            <input />
                                            <Label basic>{this.state.currency}</Label>

                                        </Input>

                                        <div className="home__limitations">
                                            <Label size="large">
                                                Your Week limit is:
                                            <Label.Detail>{Number(7 * this.state.daylimit)} </Label.Detail>
                                                {this.state.currency}
                                            </Label>

                                            <Label size="large">
                                                Your Month limit is:
                                            <Label.Detail>{Number(30 * this.state.daylimit)} </Label.Detail>
                                                {this.state.currency}
                                            </Label>

                                            <Label size="large">
                                                Your Year limit is:
                                            <Label.Detail>{Number(365 * this.state.daylimit)} </Label.Detail>
                                                {this.state.currency}
                                            </Label>
                                        </div>

                                        <div className="home__confirm-button">
                                            <Link to="/Day">
                                                <Button positive>Ok, Let's begin</Button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                )}/>

                <Route path="/Day" render={({ history }) => (
                    <Day 
                        currency={this.state.currency}
                        daylimit={this.state.daylimit}
                    />
                )}/>
            </div>
        )
    }
}
