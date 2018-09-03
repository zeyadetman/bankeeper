import React, {Component} from 'react';
import {
    values,
    reduce,
    keysIn,
    map
} from 'ramda';

export default class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayID: '02092018',
            isOpen: false,
            balance: 0,
            remainingDaily: 0,
            dayLimit: 70,
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

    handleIncomeType(e) {
        const newVal = this.state.income.types[e.target.value] + this.state.income.amount;
        this.setState({
            income: {
                amount: 0,
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
                amount: 0,
                types: {
                    ...this.state.expense.types,
                    [e.target.value]: newVal
                }
            }
        });
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
        const totalExpensesToday = reduce((ac, val) => ac + val,
            0,
            values(this.state.expense.types)
        );
        return (
            <div>
                <label>Day Limit in this Month: </label>
                <p type="number"
                    value={this.state.dayLimit}
                >
                    {
                        totalExpensesToday > this.state.dayLimit
                            ? `Warning you exceed your daily expenses limit by ${totalExpensesToday - this.state.dayLimit}`
                            : "Your day going well"
                    }
                </p>

                <label>New Income</label>
                <input type="number"
                    value={this.state.income.amount}
                    onBlur={() => this.state.income.amount}
                    onChange={this.handleIncomeAmountChange} />

                {
                    map(
                        e =>
                            <button name="incomeType"
                                key={e}
                                value={e}
                                onClick={this.handleIncomeType}>
                                {e}
                            </button>,
                        keysIn(this.state.income.types)
                    )
                }

                <label>New Expense</label>
                <input type="number"
                    value={this.state.expense.amount}
                    onBlur={() => this.state.expense.amount}
                    onChange={this.handleExpenseAmountChange} />

                {
                    map(
                        e =>
                            <button name="expenseType"
                                key={e}
                                value={e}
                                onClick={this.handleExpenseType}>
                                {e}
                            </button>,
                        keysIn(this.state.expense.types)
                    )
                }

                <div className="Task__details--button">
                    <button onClick={this.handleToggle.bind(this)}>Balance</button>
                </div>

                <div
                    isOpen={this.state.isOpen}
                    className="matchdetails Task__matchdetails"
                >
                    <p><span>EGP </span>{this.state.balance}</p>
                    <p>
                        {
                            console.log(this.state)
                        }
                    </p>
                </div>
            </div>
        )
    }
}
