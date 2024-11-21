import { createContext, useReducer, useState } from "react";
import expenseReducer from "../reducers/expenseReducer";


export const ExpensesContext = createContext()

function ExpensesContextProvider({children}) {
const [expenses, dispatch] = useReducer(expenseReducer, [])


    const addExpense = (expense) => {
        dispatch({type: 'ADD', payload: expense})
    }
    const removeExpense = (id) => {
        dispatch({type: 'DELETE', payload: id})
    }
    const setExpenses = (expenses) => {
        dispatch({type: 'SET', payload: expenses})
    }

    const value = {
        expenses,
        addExpense,
        removeExpense,
        setExpenses
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )

}

export default ExpensesContextProvider