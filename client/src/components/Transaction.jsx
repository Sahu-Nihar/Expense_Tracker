import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numbersWithCommas } from '../utils/format';

const Transaction = ({transaction}) => {

    const {deleteTransaction} = useContext(GlobalContext);

    const {text, amount} = transaction;

    const [Sign, Value] = amount < 0 ? ['-', 'minus'] : ['+', 'plus'];

    return (
        <li className={Value}>
            {text} <span>{Sign}₹{numbersWithCommas(Math.abs(amount))}</span><button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
        </li>
        
    )
}

export default Transaction;
