import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Todo -> Initial State:
const initialState = {
    transactions: [],
    errors: null,
    loading: true
}

// Todo -> Create Context:
export const GlobalContext = createContext(initialState);

// Todo -> Provider component: In order to have access to our global state we need to have a provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Todo -> Action: that is going to make call to the reducer

    async function getTransactions(){
        try {
            
            const response = await axios.get('/api/v1/transactions');

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: response.data.data
            });

        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    // ! Delete Transaction:
    async function deleteTransaction(id) {
        
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        
        } catch (error) {
            
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    // ! Add Transaction:
    async function addTransaction(transaction) {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
        
            const response = await axios.post('/api/v1/transactions', transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: response.data.data
            });

        } catch (error) {
            
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }

    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            error: state.error,
            loading: state.loading,
            getTransactions,
            addTransaction}}>
                    {children}
        </GlobalContext.Provider>);
}

