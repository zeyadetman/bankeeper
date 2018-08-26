import React, {Component} from 'react';
import {
    Card,
    RadioGroup,
    Radio,
    Collapse,
    Intent,
    Position,
    Button,
    Toaster
} from '@blueprintjs/core';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            balance: 0,
            daylimitOff: 0,
            dayLimit: 0,
            moneyThere: [{name: "Ahmed Gamal", value: 0}],
            income: {
                amount: 0,
                types: {
                    savings: 0,
                    salary: 0,
                    deposits: 0
                }
            },
            expense: {
                amount: 0,
                types: {
                    bills: 0,
                    clothes: 0,
                    communication: 0,
                    eatingOut: 0,
                    entertainment: 0,
                    food: 0,
                    gifts: 0,
                    health: 0,
                    house: 0,
                    sports: 0,
                    transport: 0
                }
            },
        }
        this.handleIncomeAmountChange = this.handleIncomeAmountChange.bind(this);
        this.handleExpenseAmountChange = this.handleExpenseAmountChange.bind(this);
        this.handleIncomeType = this.handleIncomeType.bind(this);
        this.handleExpenseType = this.handleExpenseType.bind(this);
    }

    handleToggle() {
        console.log(this.state.income.amount, this.state.expense.amount, this.state.balance);
        const newBalance = this.state.balance + this.state.income.amount - this.state.expense.amount;
        this.setState({
            ...this.state,
            income: {...this.state.income, amount: 0},
            expense: {...this.state.expense, amount: 0},
            isOpen: !this.state.isOpen,
            balance: newBalance
        });
    }

    handleIncomeType(e) {
        const newVal = this.state.income.types[e.target.value] + this.state.income.amount;
        this.setState({
            income: {
                amount: this.state.income.amount,
                types: {
                    ...this.state.income.types,
                    [e.target.value]: newVal
                }
            }
        })
    }

    handleExpenseType(e) {
        const newVal = this.state.expense.types[e.target.value] + this.state.expense.amount;
        this.setState({
            expense: {
                amount: this.state.income.amount,
                types: {
                    ...this.state.expense.types,
                    [e.target.value]: newVal
                }
            }
        })
    }

    toArr(obj) {
        return Array.from(Object.keys(obj), k => k);
    }

    handleIncomeAmountChange(e) {
        this.setState({
            income: {...this.state.income, amount: Number(e.target.value)}
        });
    }

    handleExpenseAmountChange(e) {
        this.setState({
            expense: {...this.state.expense, amount: Number(e.target.value)}
        });
    }

    render() {
        return (
            <div>
                <label>New Income</label>
                <input type="number"
                    value={this.state.income.amount}
                    onBlur={() => this.state.income.amount}
                    onChange={this.handleIncomeAmountChange} />

                {
                    this.toArr(this.state.income.types).map(
                        (e, idx) => <button name="incomeType" key={idx} value={e} onClick={this.handleIncomeType}>{e}</button>
                    )
                }

                <label>New Expense</label>
                <input type="number"
                    value={this.state.expense.amount}
                    onChange={this.handleExpenseAmountChange} />

                {
                    this.toArr(this.state.expense.types).map(
                        (e, idx) => <button name="expenseType" key={idx} value={e} onClick={this.handleExpenseType}>{e}</button>
                    )
                }

                <div className="Task__details--button">
                    <Button onClick={this.handleToggle.bind(this)}>Balance</Button>
                </div>

                <Collapse
                    isOpen={this.state.isOpen}
                    className="matchdetails Task__matchdetails"
                >
                    <p><span>EGP </span>{this.state.balance}</p>
                    <p>
                        {
                            console.log(this.state.income.types),
                        console.log(this.state.expense.types)
                    }
                    </p>
                </Collapse>
            </div>
        )
    }
}
