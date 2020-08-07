import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {

    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const {addTransaction} = useContext(GlobalContext);

    const changeText = (e) => setText(e.target.value);

    const changeAmount = (e) => setAmount(e.target.value);

    const onSubmit = event => {
        event.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random()* 100000000),
            text,
            amount: Number(amount)
        }

        addTransaction(newTransaction);
        setText('');
        setAmount(0);
    }

    return (
        <>
            <h3>Add new Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={changeText} placeholder="Enter text..."/>
                </div>
                <div className="form-control">
                    <label htmlFor="number">Amount <br/> (negative - expense, positive + income)</label>
                    <input type="number" value={amount} onChange={changeAmount} placeholder="Enter amount..."/>
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}

export default AddTransaction;