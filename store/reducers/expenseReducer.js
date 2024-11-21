import React from 'react'

function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        case 'DELETE':
            return state.filter(exp => exp.id !== action.payload)
        case 'SET':
            return action.payload
        default:
            return state
    }
  
}

export default expenseReducer