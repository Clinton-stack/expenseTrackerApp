import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ExpensesContext } from "../store/context/expensesContext";
import Toast from "react-native-toast-message";
import { postData } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";

function AddExpenseScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
  const [expense, setExpense] = useState({
    title: "",
    price: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const expenseContext = useContext(ExpensesContext);

  const validateInputs = () => {
    // Check if title is empty
    if (!expense.title.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid title",
      });
      return false; // Validation failed
    }

    // Check if price is valid
    const priceValue = parseFloat(expense.price);
    if (!expense.price || isNaN(priceValue) || priceValue <= 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid price greater than 0",
      });
      return false; // Validation failed
    }

    return true; // Validation passed
  };

  const OnAddExpense = async() => {

    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);
    try {

      const newExpense = {
        ...expense,
        price: parseFloat(expense.price),
      };
      const id = await postData(newExpense);

      setTimeout(() => {
        expenseContext.addExpense({...newExpense, id});
        setIsLoading(false);
      }, 2000);


      setExpense({
        title: "",
        price: "",
        date: new Date().toISOString().slice(0, 10),
      });
      navigation.goBack();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Expense added successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while adding the expense",
      });
    }
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

      <Pressable style={styles.addButton} onPress={OnAddExpense} disabled={isLoading}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{ isLoading ? <LoadingOverlay size={'small'}/> : 'Add Expense'}</Text>
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
