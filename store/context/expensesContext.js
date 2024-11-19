import { createContext, useState } from "react";
import { expenses as dummyData } from "../../data/dummy-data";


export const ExpensesContext = createContext()

function ExpensesContextProvider({children}) {
    const [expenses, setExpenses] = useState(dummyData)

    const addExpense = (expense) => {
        setExpenses((currentExpenses) => [expense, ...currentExpenses])
    }
    const removeExpense = (id) => {
        setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id))
    }

    const value = {
        expenses,
        addExpense,
        removeExpense
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )

}

export default ExpensesContextProvider