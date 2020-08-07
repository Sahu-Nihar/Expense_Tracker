import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numbersWithCommas } from '../utils/format';

const Balance = () => {

    const {transactions} = useContext(GlobalContext);
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts
                    .reduce((accumulator, currentValue) => (accumulator += currentValue),0)
                    .toFixed(2);
    
    const isNegative = total < 0 && '-' 

    return (
        <>
            <h2>Your Balance</h2>
            <h1>{isNegative}₹{numbersWithCommas(Math.abs(total))}</h1>
        </>
    )
}

export default Balance;