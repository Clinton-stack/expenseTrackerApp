import React from 'react'
import { View } from 'react-native'
import ExpenseItem from './ExpenseItem'

function ExpenseList({data}) {
  return (
    <View>
    {data.map((expense) => (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        title={expense.title}
        date={expense.date}
        price={expense.price}
      />
    ))}
  </View>

  )
}

export default ExpenseList