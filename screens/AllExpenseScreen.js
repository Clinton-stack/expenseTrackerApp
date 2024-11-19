import React, { useContext } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { expenses } from '../data/dummy-data'
import ExpenseList from '../components/ExpenseList'
import { Ionicons } from '@expo/vector-icons'
import { ExpensesContext } from '../store/context/expensesContext'

function AllExpenseScreen({navigation}) {

    const {expenses} = useContext(ExpensesContext)

    const total = expenses.reduce((sum, exp) => sum + exp.price, 0).toFixed(2)

    navigation.setOptions({
        headerRight: () =>{
            return (
                <Pressable onPress={() => navigation.navigate('Add Expense')}>
                    <Ionicons name="add" size={24} color="white" style={{marginRight: 16}} />
                </Pressable>
            )
        }
    })

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Total </Text>
        <Text> ${total}</Text>
    </View>  
    <ExpenseList data={expenses} />

    </ScrollView>
  )
}

export default AllExpenseScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        justifyContent: "space-between",
        padding: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        marginTop: 16,

    },
})