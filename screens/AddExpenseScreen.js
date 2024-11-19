import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ExpensesContext } from "../store/context/expensesContext";

function AddExpenseScreen({ navigation }) {
    const [expense, setExpense] = useState({
        id: 'e'+ Math.random().toString(),
        title: "",
        price: "",
        date: new Date().toISOString(),
    });
  const expenseContext = useContext(ExpensesContext);

  const OnAddExpense = () => {
    const newExpense = {
        ...expense,
        price: parseFloat(expense.price),
        };
        console.log(newExpense);
    expenseContext.addExpense(newExpense);

    setExpense({id: 'e'+ Math.random().toString(), title: "", price: "", date: new Date().toISOString(),});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Expense Name"
        style={styles.textBox}
        placeholderTextColor={"#fff"}
        value={expense.title}
        onChangeText={(text) => setExpense({ ...expense, title: text })}
      />
      <TextInput
        placeholder="Price"
        style={styles.textBox}
        placeholderTextColor={"#fff"}
        value={expense.price}
        onChangeText={(text) => setExpense({ ...expense, price: text })}
        keyboardType="numeric"
      />

      <Pressable style={styles.addButton} onPress={OnAddExpense}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Add Expense</Text>
      </Pressable>
    </View>
  );
}

export default AddExpenseScreen;

const styles = StyleSheet.create({
  textBox: {
    height: 40,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    width: 300,
    color: "white",
    backgroundColor: "#c3a08a",
    marginBottom: 16,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  addButton: {
    backgroundColor: "#351401",
    padding: 16,
    borderRadius: 8,
  },
});
