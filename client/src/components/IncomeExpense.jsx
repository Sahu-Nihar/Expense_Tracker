import React,{useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numbersWithCommas } from '../utils/format';

const IncomeExpense = () => {

    const {transactions} = useContext(GlobalContext);
    const amounts = transactions.map(transaction => transaction.amount);
    const income = amounts
                        .filter(item => item > 0)
                        .reduce((accumulator, currentValue) => (accumulator += currentValue),0)
                        .toFixed(2);

    const expense = Math.abs(amounts
                        .filter(item => item < 0)
                        .reduce((accumulator, currentValue) => (accumulator += currentValue),0)
                        .toFixed(2))

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">₹{numbersWithCommas(income)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">₹{numbersWithCommas(expense)}</p>
            </div>
        </div>
    )
}

export default IncomeExpense;
