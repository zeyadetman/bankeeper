import React, {Component} from 'react';
import {
    values,
    reduce
} from 'ramda';
import {
    Button,
    Dropdown,
    Label,
    Input,
    Message
} from 'semantic-ui-react';
import {SemanticToastContainer, toast} from 'react-semantic-toasts';
import {income, expenses} from '../../categories/index';
import './day.css';

export default class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayID: '02092018',
            isOpen: false,
            balance: 0,
            remainingDaily: 0,
            daylimit: 0,
            currency: '',
            income: {
                amount: 0,
                types: {}
            },
            expense: {
                amount: 0,
                types: {}
            }
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleType = this.handleType.bind(this);
    }

    handleToggle() {
        const totalIncome = reduce((ac, val) => ac + val,
            0,
            values(this.state.income.types)
        );

        const totalExpense = reduce((ac, val) => ac + val,
            0,
            values(this.state.expense.types)
        );

        const newBalance = totalIncome - totalExpense;
        this.setState({
            ...this.state,
            income: {...this.state.income, amount: 0},
            expense: {...this.state.expense, amount: 0},
            isOpen: !this.state.isOpen,
            balance: newBalance
        });
    }

    handleType(e, {name, value}) {
        const newVal = this.state[name].types[value]
            ? this.state[name].types[value] + this.state[name].amount
            : this.state[name].amount;
        this.setState({
            [name]: {
                amount: 0,
                types: {
                    ...this.state[name].types,
                    [value]: newVal
                }
            }
        });

        toast({
            type: 'success',
            icon: 'checkmark',
            title: `Your ${name} added successfully`,
            description: `The amount is ${this.state[name].amount}${this.state.currency} in the category ${value},
             Check your balance for more details.`,
            time: 5000
        });
    }

    handleAmountChange(e, {name}) {
        console.log(name);
        this.setState({
            [name]: {...this.state[name], amount: Number(e.target.value)}
        });
    }

    componentWillMount() {
        const currency = localStorage.getItem('currency');
        const daylimit = localStorage.getItem('daylimit');

        this.setState({currency});
        this.setState({daylimit});

        console.log(currency, daylimit);
    }

    render() {
        const totalExpensesToday = reduce((ac, val) => ac + val,
            0,
            values(this.state.expense.types)
        );
        return (
            <div className="day">
                <SemanticToastContainer position="top-center" />
                <label>Day Limit in this Month: </label>
                <div className="day__limit-info">
                    {
                        totalExpensesToday > this.state.daylimit
                            ? <Message negative>
                                <Message.Header>Oh! You're in the wrong way!</Message.Header>
                                <p>You exceeded the daily limit, Try to save {totalExpensesToday - this.state.daylimit}{this.state.currency} and come back to your correct way.</p>
                            </Message>
                            : <Message success >
                                <Message.Header>Great! Your day is going well!</Message.Header>
                                <p>You still have {this.state.daylimit - totalExpensesToday}{this.state.currency} to expense.</p>
                            </Message>
                    }
                </div>

                <Input labelPosition='right'
                    onChange={this.handleAmountChange}
                    type='number'
                    name="income"
                    className="day__amount"
                    placeholder='New Income'>
                    <input />
                    <Label basic>{this.state.currency}</Label>
                </Input>

                <Dropdown placeholder='Select Income Category'
                    fluid
                    name='income'
                    selection
                    onChange={this.handleType}
                    options={income}
                />

                <Input labelPosition='right'
                    onChange={this.handleAmountChange}
                    type='number'
                    name="expense"
                    className="day__amount"
                    placeholder='New Expense'>
                    <input />
                    <Label basic>{this.state.currency}</Label>
                </Input>

                <Dropdown placeholder='Select Expense Category'
                    fluid
                    name='expense'
                    selection
                    onChange={this.handleType}
                    options={expenses}
                />

                <div className="day__balance-button">
                    <Button onClick={this.handleToggle.bind(this)}>Balance</Button>
                </div>


                <p><span>{this.state.currency}  </span>{this.state.balance}</p>
                <p>
                    {
                        console.log(this.state)
                    }
                </p>
            </div>
        )
    }
}
