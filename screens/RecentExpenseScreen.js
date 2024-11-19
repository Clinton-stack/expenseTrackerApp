import React, { useContext } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import ExpenseList from '../components/ExpenseList'
import { Ionicons } from '@expo/vector-icons'
import { ExpensesContext } from '../store/context/expensesContext'

function RecentExpenseScreen({navigation}) {

    const {expenses} = useContext(ExpensesContext)
    const last7Days = new Date(); 
    last7Days.setDate(last7Days.getDate() - 7); 
  
    const recentExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date); 
      return expenseDate >= last7Days;
    });

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
          <Text>Last 7 Days</Text>
          <Text>${recentExpenses.reduce((sum, exp) => sum + exp.price, 0).toFixed(2)}</Text>
        </View>
        <ExpenseList data={recentExpenses} />
      </ScrollView>
    );
}

export default RecentExpenseScreen

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